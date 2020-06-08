import React, { useState, useCallback, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import { Modal } from 'react-bootstrap';
import 'react-image-crop/dist/ReactCrop.css';
import { useTranslation } from 'react-i18next';
import { FiUpload } from 'react-icons/fi';

import ButtonLoader from '../../Button';

import notify from '../../../services/toast';
import './styles.css';

export default function Dropzone({ onFileUploaded }) {
  const { t } = useTranslation('', { useSuspense: false });
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [show, setShow] = useState(false);
  const [upImg, setUpImg] = useState();
  const [imgName, setImgName] = useState('');
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 / 1 });
  const [previewUrl, setPreviewUrl] = useState();
  const [cropped, setCropped] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModalExit = () => {
    setUpImg(null);
    setPreviewUrl(null);
    setCropped(null);
    setImgName('');
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].name.includes('.png') || e.target.files[0].name.includes('.jpg') || e.target.files[0].name.includes('.jpeg')) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
        setImgName(e.target.files[0].name);
        handleShow();
      } else {
        notify(t('imageinvalid'), 'error', 'top-center');
        e.target.value = '';
      }
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          dataURLtoFile(reader.result, imgName);
        };
      }, 'image/jpeg');
    });
  };

  const makeClientCrop = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      createCropPreview(imgRef.current, crop, imgName);
    }
  };

  const dataURLtoFile = async (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const croppedImage = new File([u8arr], filename, { type: mime });
    setCropped(croppedImage);
  };

  async function save() {
    try {
      setLoadingAvatar(true);
      onFileUploaded(cropped);
      handleClose();
    } catch (err) {
      notify(err.message, 'error', 'top-center');
    } finally {
      setLoadingAvatar(false);
    }
  }

  return (
    <div>
      <div className="picture-button-container">
        <input id="input-picture" type="file" accept=".png, .jpg, .jpeg" onChange={onSelectFile} />
        <label className="dropzone" htmlFor="input-picture">
          <FiUpload size={18} color="#34cb79"/>
          <br />

          {t('pointimage')}
        </label>
      </div>
      <Modal show={show} onHide={handleClose} centered onExit={handleModalExit} backdrop={loadingAvatar ? 'static' : true}>
        <Modal.Header closeButton>
          <Modal.Title>{t('croppicture')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCrop src={upImg} onImageLoaded={onLoad} crop={crop} onChange={(c) => setCrop(c)} onComplete={makeClientCrop} />
        </Modal.Body>
        <Modal.Footer>
          <div className="footer-buttons">
            <ButtonLoader height={35} size={20} color="#8d949e" func={() => save()} loading={loadingAvatar} defaultText={t('save')} />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

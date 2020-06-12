import React, { useState, useContext, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import Geocode from 'react-geocode';
import * as Yup from 'yup';

import { Context } from '../../Context/LanguageContext';

import ButtonLoader from '../Button';
import Map from './Map';
import Dropzone from './Dropzone';

import api from '../../services/api';
import notify from '../../services/toast';

import './styles.css';
import 'react-phone-number-input/style.css';

import metadata from '../../assets/resources/metadata.min.json';
import labels from 'react-phone-number-input/locale/en.json';

interface CreatePointProps {
  show: boolean;
  handleShow: any;
  handleClose: any;
}

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLE_API_KEY}`);

const CreatePoint: React.FC<CreatePointProps> = (props) => {
  const { t } = useTranslation('', { useSuspense: false });
  const { language } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ad_location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(language === 'pt' ? -23.5489 : 40.73061);
  const [lng, setLng] = useState(language === 'pt' ? -46.6388 : -73.935242);
  const [currentZoom, setCurrentZoom] = useState(8);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [image, setImage] = useState<File>();
  const [fileURL, setFileURL] = useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('pointnamerequired')),
    email: Yup.string().email(t('pointemailinvalid')).required(t('pointemailrequired')),
    whatsapp: Yup.string()
      .test(t('pointphone'), t('pointphonerequired'), function (value) {
        if (!value || value === undefined) return false;
        return true;
      })
      .test(t('pointphone'), t('pointphoneinvalid'), function (value) {
        if (!isValidPhoneNumber(value)) return false;
        return true;
      })
      .required(t('pointphonerequired')),
    latitude: Yup.number().required(t('pointlocationrequired')),
    longitude: Yup.number().required(t('pointlocationrequired')),
    address: Yup.string()
      .test(t('pointlocation'), t('pointlocationrequired'), function (value) {
        if (value === t('pointlocationnf')) return false;
        return true;
      })
      .required(t('pointlocationrequired')),
    compound: Yup.string()
      .test(t('pointlocation'), t('pointlocationrequired'), function (value) {
        if (value === t('pointlocationnf')) return false;
        return true;
      })
      .required(t('pointlocationrequired')),
    items: Yup.array()
      .test(t('pointitems'), t('pointitemrequired'), function (value) {
        if (value && value.length === 0) return false;
        return true;
      })
      .required(t('pointitemrequired')),
  });

  useEffect(() => {
    let latitude: number, longitude: number;
    async function setCords() {
      Geocode.fromLatLng(`${latitude ? latitude : lat}`, `${longitude ? longitude : lng}`).then(
        (response) => {
          const { compound_code } = response.plus_code;
          if (compound_code) {
            setLocation(compound_code.split(/(?<=^\S+)\s/)[1]);
            setAddress(response.results[0].formatted_address);
          } else {
            setAddress(t('pointlocationnf'));
            setLocation(t('pointlocationnf'));
          }
        },
        (error) => {
          setAddress(t('pointlocationnf'));
          setLocation(t('pointlocationnf'));
        }
      );
    }
    async function loadCords() {
      await navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        setLat(latitude);
        setLng(longitude);
        await setCords();
      });
      await setCords();
    }
    loadCords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (image) setFileURL(URL.createObjectURL(image));
  }, [image]);
  async function handleClickedMap(e: { latLng: { lat: () => any; lng: () => any } }) {
    setLat(e.latLng.lat());
    setLng(e.latLng.lng());
    await Geocode.fromLatLng(`${e.latLng.lat()}`, `${e.latLng.lng()}`).then(
      (response) => {
        const { compound_code } = response.plus_code;
        if (compound_code) {
          setLocation(compound_code.split(/(?<=^\S+)\s/)[1]);
          setAddress(response.results[0].formatted_address);
        } else {
          setAddress(t('pointlocationnf'));
          setLocation(t('pointlocationnf'));
        }
      },
      (error) => {
        setAddress(t('pointlocationnf'));
        setLocation(t('pointlocationnf'));
      }
    );
  }

  function handleZoomChanged(newZoom: any) {
    setCurrentZoom(newZoom);
  }

  async function save() {
    try {
      setLoading(true);
      const body = {
        name,
        email,
        whatsapp,
        latitude: lat,
        longitude: lng,
        address,
        compound: ad_location,
        items: selectedItems,
      };

      await validationSchema.validate(body).catch((err) => {
        throw new Error(err.message);
      });

      if (!image) throw new Error(t('imageerr'));

      const response = await api.post('points', body);

      const { id } = response.data;

      const data = new FormData();
      data.append('image', image);

      await api.post(`pointsimage/${id}`, data);

      notify(t('pointregister'), 'success', 'top-center');
      window.location.reload(true);
    } catch (err) {
      notify(err.response === undefined ? err.message : err.response.data.message ? err.response.data.message : err.response.data, 'error', 'top-center');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else setSelectedItems([...selectedItems, id]);
  }

  return (
    <>
      <li className="nav-item">
        <span className="icon-button" onClick={props.handleShow}>
          <FaPlus />
        </span>
      </li>
      <Modal show={props.show} onHide={props.handleClose} centered size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{t('createpoint')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <legend>
                <h2>{t('pointdata')}</h2>
              </legend>
              <div className="field">
                {fileURL ? (
                  <>
                    <div className="point-image-container">
                      <img src={fileURL} alt={t('pointimage')} className="point-image" />
                    </div>
                    <div className="delete-button">
                      <FaTrash
                        color="#34cb79"
                        onClick={() => {
                          setFileURL('');
                          setImage(undefined);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <Dropzone onFileUploaded={setImage} />
                )}
              </div>
              <div className="field">
                <label htmlFor="name">{t('pointname')}</label>
                <input type="text" name="name" id="name" value={name} placeholder={`${t('pointname')}`} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">{t('pointemail')}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="input-fieldgroup"
                    placeholder={`${t('pointemail')}`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">{t('pointphone')}</label>
                  <PhoneInput
                    placeholder={`${t('pointphone')}`}
                    name="whatsapp"
                    value={whatsapp}
                    onChange={setWhatsapp}
                    labels={labels}
                    metadata={metadata}
                    maxLength={13}
                    defaultCountry={language === 'pt' ? 'BR' : 'US'}
                    error={whatsapp ? (isValidPhoneNumber(whatsapp) ? undefined : 'Invalid phone number') : 'Phone number required'}
                  />
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>
                <h2>{t('pointaddress')}</h2>
                <span>{t('pointaddressselect')}</span>
              </legend>

              <div className="field">
                <Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  center={{ lat, lng }}
                  zoom={currentZoom}
                  onZoomChanged={handleZoomChanged}
                  onClick={handleClickedMap}
                />
              </div>

              {/* <div className="field-group"> */}
              <div className="field" style={{ marginBottom: '10px' }}>
                <input type="text" name="address" id="address" placeholder={`${t('pointaddress')}`} value={address} disabled />
              </div>

              <div className="field">
                <input type="text" name="location" id="location" placeholder={`${t('pointlocation')}`} value={ad_location} disabled />
              </div>
              {/* </div> */}
            </fieldset>
            <fieldset>
              <legend>
                <h2>{t('pointitems')}</h2>
                <span>{t('pointitemselect')}</span>
              </legend>

              <ul className="items-grid">
                <li onClick={() => handleSelectItem(1)} className={selectedItems.includes(1) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/lamps.svg`} alt={`${t('pointitemslamps')}`} />
                  <span>{t('pointitemslamps')}</span>
                </li>
                <li onClick={() => handleSelectItem(2)} className={selectedItems.includes(2) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/battery.svg`} alt={`${t('pointitemsbattery')}`} />
                  <span>{t('pointitemsbattery')}</span>
                </li>
                <li onClick={() => handleSelectItem(3)} className={selectedItems.includes(3) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/papers.svg`} alt={`${t('pointitemspapers')}`} />
                  <span>{t('pointitemspapers')}</span>
                </li>
                <li onClick={() => handleSelectItem(4)} className={selectedItems.includes(4) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/electronic.svg`} alt={`${t('pointitemselectronic')}`} />
                  <span>{t('pointitemselectronic')}</span>
                </li>
                <li onClick={() => handleSelectItem(5)} className={selectedItems.includes(5) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/organic.svg`} alt={`${t('pointitemselorganic')}`} />
                  <span>{t('pointitemselorganic')}</span>
                </li>
                <li onClick={() => handleSelectItem(6)} className={selectedItems.includes(6) ? 'selected' : ''}>
                  <img src={`${process.env.REACT_APP_API_URL}uploads/oil.svg`} alt={`${t('pointitemsoil')}`} />
                  <span>{t('pointitemsoil')}</span>
                </li>
              </ul>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="footer-buttons">
            <ButtonLoader height={35} size={20} color="#8d949e" func={() => save()} loading={loading} defaultText={t('save')} />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreatePoint;

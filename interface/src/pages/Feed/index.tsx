import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaMapMarkerAlt, FaEnvelopeOpenText, FaSearch } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

import Loader from '../../components/LoaderSpinner';

import notify from '../../services/toast';
import api from '../../services/api';

import './styles.css';

interface FeedProps {
  title: string;
}

interface Points {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  compound: string;
  address: string;
  image: string;
  items: Array<number>;
}

const Feed: React.FC<FeedProps> = (props) => {
  document.title = `${props.title} | eColeta`;
  const [points, setPoints] = useState<Points[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingS, setLoadingS] = useState(true);
  const [compound, setCoumpund] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState<number[]>([]);
  const { t } = useTranslation('', { useSuspense: false });

  async function loadPoints() {
    try {
      setLoadingS(true);
      const response = await api.get('points');
      const { data } = response;
      setPoints(data);
    } catch (err) {
      setPoints([]);
      notify(err.response === undefined ? err.message : err.response.data.message ? err.response.data.message : err.response.data, 'error', 'top-center');
    } finally {
      setLoadingS(false);
    }
  }

  useEffect(() => {
    loadPoints();
  }, []);

  async function searchPoints() {
    try {
      setLoading(true);
      const addressWhere = address ? encodeURI(address) : '';
      const compoundWhere = compound ? encodeURI(compound) : '';
      const itemsWhere = items ? encodeURI(items.toString()) : '';

      let query = [];

      if (addressWhere) query.push(`address=${addressWhere}`);
      if (compoundWhere) query.push(`compound=${compoundWhere}`);
      if (itemsWhere) query.push(`items=${itemsWhere}`);

      let link = 'points';

      if (query.length > 0) {
        link = `${link}?${query.join('&')}`;
      }
      const response = await api.get(link);
      const { data } = response;
      setPoints(data);
    } catch (err) {
      setPoints([]);
      notify(err.response === undefined ? err.message : err.response.data.message ? err.response.data.message : err.response.data, 'error', 'top-center');
    } finally {
      setLoading(false);
    }
  }

  function handleSelectItem(id: number) {
    const alreadySelected = items.findIndex((item) => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = items.filter((item) => item !== id);

      setItems(filteredItems);
    } else setItems([...items, id]);
  }

  function WasteItemImg(id: number) {
    if (id === 1) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/lamps.svg`} alt={`${t('pointitemslamps')}`} />
          <span className="tooltiptext">{t('pointitemslamps')}</span>
        </div>
      );
    }
    if (id === 2) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/battery.svg`} alt={`${t('pointitemsbattery')}`} />
          <span className="tooltiptext">{t('pointitemsbattery')}</span>
        </div>
      );
    }
    if (id === 3) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/papers.svg`} alt={`${t('pointitemspapers')}`} />
          <span className="tooltiptext">{t('pointitemspapers')}</span>
        </div>
      );
    }
    if (id === 4) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/electronic.svg`} alt={`${t('pointitemselectronic')}`} />
          <span className="tooltiptext">{t('pointitemselectronic')}</span>
        </div>
      );
    }
    if (id === 5) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/organic.svg`} alt={`${t('pointitemselorganic')}`} />
          <span className="tooltiptext">{t('pointitemselorganic')}</span>
        </div>
      );
    }
    if (id === 6) {
      return (
        <div className="tooltip">
          <img src={`${process.env.REACT_APP_API_URL}uploads/oil.svg`} alt={`${t('pointitemsoil')}`} />
          <span className="tooltiptext">{t('pointitemsoil')}</span>
        </div>
      );
    }
  }

  if (loadingS) {
    return <Loader />;
  }

  return (
    <main className="feed">
      <div className="filters">
        <h2>{t('filters')}</h2>
        <div className={`search-button${loading ? ' search-disable' : ''}`}>
          {!loading ? <FaSearch size={15} color="#34cb79" onClick={() => searchPoints()} /> : <ClipLoader size={15} color="#34cb79" />}
        </div>
        <div className="filters-value">
          <div className="field">
            <label htmlFor="address">{t('pointaddress')}</label>
            <input type="text" name="address" id="address" value={address} placeholder={`${t('pointaddress')}`} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="location">{t('pointlocation')}</label>
            <input type="text" name="location" id="location" value={compound} placeholder={`${t('pointlocation')}`} onChange={(e) => setCoumpund(e.target.value)} />
          </div>
        </div>
        <div className="filters-items">
          <label>{t('pointitems')}</label>
          <ul className="items-grid">
            <li onClick={() => handleSelectItem(1)} className={items.includes(1) ? 'selected' : ''}>
              {WasteItemImg(1)}
            </li>
            <li onClick={() => handleSelectItem(2)} className={items.includes(2) ? 'selected' : ''}>
              {WasteItemImg(2)}
            </li>
            <li onClick={() => handleSelectItem(3)} className={items.includes(3) ? 'selected' : ''}>
              {WasteItemImg(3)}
            </li>
            <li onClick={() => handleSelectItem(4)} className={items.includes(4) ? 'selected' : ''}>
              {WasteItemImg(4)}
            </li>
            <li onClick={() => handleSelectItem(5)} className={items.includes(5) ? 'selected' : ''}>
              {WasteItemImg(5)}
            </li>
            <li onClick={() => handleSelectItem(6)} className={items.includes(6) ? 'selected' : ''}>
              {WasteItemImg(6)}
            </li>
          </ul>
        </div>
      </div>
      <div className="points">
        <ul>
          {points === []
            ? ''
            : points.map((point) => (
                <li key={point.id}>
                  <header>
                    <img src={point.image} alt={point.name} className="point-image" />
                    <div className="info">
                      <strong>{point.name}</strong>
                      <p className="email">{point.email}</p>
                      <div className="waste-items">{point.items.map((item) => WasteItemImg(item))}</div>
                    </div>
                  </header>

                  <p className="address">{point.address}</p>
                  <p className="compound">{point.compound}</p>

                  <br />

                  <div className="social">
                    <a href={`http://www.google.com/maps/place/${point.latitude},${point.longitude}`} className="social-button" target="blank" rel="noopener noreferrer">
                      <FaMapMarkerAlt color="#34cb79" />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?phone=${point.whatsapp}&text=${encodeURI(t('whatsmsg'))}`}
                      className="social-button"
                      target="blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp color="#34cb79" />
                    </a>
                    <a href={`mailto:${point.email}?subject=eColeta&body=${encodeURI(t('whatsmsg'))}`} className="social-button" target="blank" rel="noopener noreferrer">
                      <FaEnvelopeOpenText color="#34cb79" />
                    </a>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </main>
  );
};

export default Feed;

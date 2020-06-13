import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import * as Yup from 'yup';

import ButtonLoader from '../Button';

import api from '../../services/api';
import notify from '../../services/toast';

import { ReactComponent as MessengerIcon } from '~/assets/icons/messenger.svg';

const Contact: React.FC = (props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  const validationSchema = Yup.object().shape({
    message: Yup.string().required(t('messagerequired')),
    email: Yup.string().email(t('pointemailinvalid')).required(t('pointemailrequired')),
    name: Yup.string().required(t('pointnamerequired')),
  });

  function ContactModal() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    async function send() {
      try {
        setLoading(true);
        const body = {
          name,
          email,
          message,
        };

        await validationSchema.validate(body).catch((err) => {
          throw new Error(err.message);
        });

        await api.post('/contact', body);

        notify(t('messagesent'), 'success', 'top-center');
      } catch (err) {
        notify(err.response === undefined ? err.message : err.response.data.message ? err.response.data.message : err.response.data, 'error', 'top-center');
      } finally {
        setLoading(false);
      }
      return true;
    }
    return (
      <Modal show={show} onHide={() => setShow(false)} centered size="lg" backdrop="static" className="contact-modal">
        <Modal.Header closeButton>
          <Modal.Title>{t('contact')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <fieldset>
              <div className="field">
                <label htmlFor="name">{t('messagename')}</label>
                <input type="text" name="name" id="name" value={name} placeholder={`${t('messagename')}`} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="email">{t('pointemail')}</label>
                <input type="email" name="email" id="email" value={email} placeholder={`${t('pointemail')}`} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="email">{t('messagetext')}</label>
                <textarea placeholder={t('messagetext')} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
            </fieldset>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="footer-buttons">
            <ButtonLoader height={35} size={20} color="#8d949e" func={() => send()} loading={loading} defaultText={t('send')} />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
  return (
    <>
      <span className="menu-item" onClick={() => setShow(!show)}>
        <span className="icon-button">
          <MessengerIcon />
        </span>
        {t('contact')}
      </span>
      <ContactModal />
    </>
  );
};

export default Contact;

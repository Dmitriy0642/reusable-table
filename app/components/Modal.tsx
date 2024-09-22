import React, { useState, useEffect } from "react";
import styles from "../styles/modal.module.css";

interface ModalProps {
  initialFields: Record<string, string>;
  onSave: (fields: Record<string, string>) => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  initialFields,
  onSave,
  onClose,
  isOpen,
  title,
}) => {
  const [fields, setFields] = useState(initialFields);

  useEffect(() => {
    setFields(initialFields);
  }, [initialFields]);

  const handleChange = (key: string, value: string) => {
    setFields((prevFields) => ({
      ...prevFields,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(fields);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <section className={styles.modal_header}>
          <span className={styles.title}>{title}</span>
          <span onClick={onClose} className={styles.closeButton}>
            X
          </span>
        </section>
        <section className={styles.modalbody}>
          {Object.keys(fields).map((key) => (
            <div key={key} className={styles.modalcontainer}>
              <label className={styles.label}>{key}</label>
              <input
                type="text"
                value={fields[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={styles.input}
                placeholder={`Edit ${key}`}
              />
            </div>
          ))}
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </section>
      </div>
    </div>
  );
};

export default Modal;

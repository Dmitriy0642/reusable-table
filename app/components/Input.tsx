import React, { useState } from "react";
import styles from "../styles/table.module.css";

interface InputI {
  placeholder: string;
}

const Input = ({ placeholder }: InputI) => {
  const [value, setValue] = useState<string>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.input_block}>
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
        value={value}
      />
    </div>
  );
};

export default Input;

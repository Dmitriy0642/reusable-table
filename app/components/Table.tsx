import React, { useState } from "react";
import "../styles/table.css";
import { getValueByPath } from "../utilities/getValueByPath";
import { getKeys } from "../utilities/getHeaders";
import Modal from "./Modal";

interface TableProps {
  data: Record<string, any>[];
  renderHeader?: (key: string) => JSX.Element | string;
  renderCell?: (
    value: any,
    key: string,
    row: Record<string, any>
  ) => JSX.Element | string;
}
const Table: React.FC<TableProps> = ({ data, renderCell, renderHeader }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<number | null>(null);
  const [editableFields, setEditableFields] = useState<Record<string, string>>(
    {}
  );
  const keys = getKeys(data[0]);
  const handleEditClick = (rowIndex: number) => {
    const row = data[rowIndex];

    const textFields: Record<string, string> = {};
    keys.forEach((key) => {
      const value = getValueByPath(row, key);
      if (typeof value === "string") {
        textFields[key] = value;
      }
    });

    setEditableFields(textFields);
    setCurrentRow(rowIndex);
    setModalOpen(true);
  };

  const handleSave = (updatedFields: Record<string, string>) => {
    if (currentRow !== null) {
      Object.keys(updatedFields).forEach((key) => {
        if (key.includes(".")) {
          const keys = key.split(".");
          let current = data[currentRow];
          for (let i = 0; i < keys.length - 1; i++) {
            const subKey = keys[i];
            if (!current[subKey]) {
              current[subKey] = {};
            }
            current = current[subKey];
          }
          current[keys[keys.length - 1]] = updatedFields[key];
        } else {
          data[currentRow][key] = updatedFields[key];
        }
      });

      setModalOpen(false);
    }
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{renderHeader ? renderHeader(key) : key}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key) => (
                <td key={key}>
                  {renderCell
                    ? renderCell(getValueByPath(row, key), key, row)
                    : getValueByPath(row, key)}
                </td>
              ))}
              <td>
                <button
                  className="changebutton"
                  id={`${rowIndex}`}
                  onClick={() => handleEditClick(rowIndex)}
                >
                  Change
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        initialFields={editableFields}
        isOpen={isModalOpen}
        title="Edit Fields"
        onSave={handleSave}
        onClose={handleClose}
      />
    </div>
  );
};

export default Table;

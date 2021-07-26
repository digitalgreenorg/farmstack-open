import React, { useState } from 'react';
import { useConfigurations } from '../../../contexts/ConfigurationsProvider';
// import CustomSelect from '../../custom-select/CustomSelect';
import './InputTab.css';

/**
    * TODO: Custom Select design need to be made
*/
function InputTab({nextStep}) {
    const {updateConfigurationData} = useConfigurations();

    const inputFields = {
        spreadsheet: [
            { key: 'ss1', value: 'tech_res', text: 'DG Tech Team Survey (Responses)' },
            { key: 'ss2', value: 'comm_res', text: 'DG Comm Team Survey (Responses)' },
            { key: 'ss3', value: 'mle_res', text: 'DG MLE Team Survey (Responses)' }
        ],
        worksheet: [
            { key: 'ws1', value: 'Response_1', text: 'Form Responses 1' },
            { key: 'ws2', value: 'Response_2', text: 'Form Responses 2' },
            { key: 'ws3', value: 'Response_3', text: 'Form Responses 3' }
        ],
        dimension: [
            { key: 'dim1', value: 'cols', text: 'Columns' },
            { key: 'dim2', value: 'rows', text: 'Rows' }
        ],
        header: [
            { key: 'h_y', value: '1', text: 'Yes' },
            { key: 'h_n', value: '0', text: 'No' }
        ],
        all: [
            { key: 'a_y', value: '1', text: 'Yes' },
            { key: 'a_n', value: '0', text: 'No' }
        ]
    };

    const [formData, setFormData] = useState({
        spreadsheet: inputFields.spreadsheet[0].value,
        worksheet: inputFields.worksheet[0].value,
        dimension: inputFields.dimension[0].value,
        header: inputFields.header[0].value,
        all: inputFields.all[0].value
    });

    const updateInputData = () => {
        updateConfigurationData({input: formData});
        nextStep('sample');
    }

    return (
        <>
            <form className="ui form">
                <div className="field">
                    <label>
                        Spreadsheet&nbsp;
                        <sup className="mandate__star">*</sup>
                        <span className="hint--top cursor__pointer" aria-label="Spreadsheet info">
                            <i aria-hidden="true" className="info circle icon info__icon" />
                        </span>
                    </label>
                    <div className="select-spreadsheet-group">
                        <select value={formData.spreadsheet} onChange={e => setFormData({...formData, spreadsheet: e.target.value})}>
                            {inputFields.spreadsheet.map(option => {
                                return (
                                    <option key={option.key} value={option.value}>
                                        {option.text}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="spreadsheet-refresh">
                            <i aria-hidden="true" className="refresh icon" />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>
                        Worksheet&nbsp;
                        <sup className="mandate__star">*</sup>
                        <span className="hint--top cursor__pointer" aria-label="Worksheet info">
                            <i aria-hidden="true" className="info circle icon info__icon" />
                        </span>
                    </label>
                    <div className="select-spreadsheet-group">
                        <select value={formData.worksheet} onChange={e => setFormData({...formData, worksheet: e.target.value})}>
                            {inputFields.worksheet.map(option => {
                                return (
                                    <option key={option.key} value={option.value}>
                                        {option.text}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="spreadsheet-refresh">
                            <i aria-hidden="true" className="refresh icon" />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Dimension&nbsp;<sup className="mandate__star">*</sup></label>
                    <select value={formData.dimension} onChange={e => setFormData({...formData, dimension: e.target.value})}>
                        {inputFields.dimension.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                    {/* <CustomSelect options={inputFields.dimension} getSelectedOption={optionValue => setFormData({...formData, dimension: optionValue})} /> */}
                </div>
                <div className="field">
                    <label>Use first row or columns as a header&nbsp;<sup className="mandate__star">*</sup></label>
                    <select value={formData.header} onChange={e => setFormData({...formData, header: e.target.value})}>
                        {inputFields.header.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="field">
                    <label>Select all data&nbsp;<sup className="mandate__star">*</sup></label>
                    <select value={formData.all} onChange={e => setFormData({...formData, all: e.target.value})}>
                        {inputFields.all.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </form>

            <div className="step-change-btn-wrapper">
                <button className="ui icon button fs-primary-outline-btn" onClick={updateInputData}>Continue</button>
            </div>
        </>
    )
}

export default InputTab;
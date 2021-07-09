import React from 'react';

/**
    * TODO: Custom Select need to be made
*/
function InputTab() {
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
                    <select>
                        {inputFields.spreadsheet.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="field">
                    <label>
                        Worksheet&nbsp;
                        <sup className="mandate__star">*</sup>
                        <span className="hint--top cursor__pointer" aria-label="Worksheet info">
                            <i aria-hidden="true" className="info circle icon info__icon" />
                        </span>
                    </label>
                    <select>
                        {inputFields.worksheet.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="field">
                    <label>Dimension&nbsp;<sup className="mandate__star">*</sup></label>
                    <select>
                        {inputFields.dimension.map(option => {
                            return (
                                <option key={option.key} value={option.value}>
                                    {option.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="field">
                    <label>Use first row or columns as a header&nbsp;<sup className="mandate__star">*</sup></label>
                    <select>
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
                    <select>
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
        </>
    )
}

export default InputTab;
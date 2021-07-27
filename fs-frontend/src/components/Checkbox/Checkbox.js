import React from 'react';
import './Checkbox.css';
import { v4 as uuidv4 } from 'uuid';

const Checkbox = React.forwardRef(({label}, ref) => {
    const checkboxId = uuidv4();
    return (
        <>
            <div className="fs__custom__checkbox__container">
                <svg className="checkbox-symbol">
                    <symbol id="check" viewBox="0 0 12 10">
                        <polyline
                        points="1.5 6 4.5 9 10.5 1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        ></polyline>
                    </symbol>
                </svg>

                <div className="checkbox-container">
                    <input ref={ref} className="checkbox-input" id={checkboxId} type="checkbox" />
                    <label className="checkbox" htmlFor={checkboxId}>
                        <span>
                            <svg width="12px" height="10px">
                                <use xlinkHref="#check"></use>
                            </svg>
                        </span>
                        <span>{label}</span>
                    </label>
                </div>
            </div>
        </>
    )
});

export default Checkbox;
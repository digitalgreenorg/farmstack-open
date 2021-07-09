import React from 'react';
import './ComponentsTab.css';

function ComponentsTab({sendCompData}) {
    return (
        <>
            <div className="fs-conf-tab-container">
                <div className="fs-conf-tab-component cursor__pointer" onClick={e => sendCompData('google')}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                        <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M16,14H8v-2h8V14z M14,18H8v-2h6V18z M13,9V3.5 L18.5,9H13z"/>
                    </svg>
                    <div className="ui header">Google Spreadsheets</div>
                    <p>farmstack/gspreadsheets</p>
                </div>
                {/* <div></div>
                <div></div> */}
            </div>
        </>
    )
}

export default ComponentsTab;
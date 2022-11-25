import React from 'react';
import Modal from 'react-modal';

function DeleteDialog(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}
        onRequestClose={props.close}
        className={{base: 'dialog dialog-delete shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
    >     
     <button type="button" className="dialog-close dim btn-close" aria-label="Close" onClick={props.close}/>        
     <div className="dialog-data fr">
        <div className="dialog-body">            
            <span className="dialog-title pb2">{props.title}</span>            
            <span className="dialog-subtitle">{props.subtitle}</span>
        </div>                  
        <div className="dialog-button">
            <button type="button" style={{cursor: "pointer"}} className="btn btn-secondary btn-sm" onClick={props.close}>Batal</button>
            <button type="button" style={{marginLeft: 5}} className="btn btn-primary btn-sm" onClick={props.onClick}>Hapus</button>      
        </div>
     </div>
    </Modal>
    );
}

export default DeleteDialog;
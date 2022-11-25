import React from 'react';
import Modal from 'react-modal';

function EditModal(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}        
        className={{base: 'modalx shadow-3',afterOpen: 'modalx-base_after-open',beforeClose: 'modalx-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
        style={{
            content: {
                width:props.width,
                height:props.height
            }
        }}
    > 
     <div className="modalx-header">
        <div className="title">{props.title}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <button type="button" className="dialog-close dim btn-close" aria-label="Close" onClick={props.close}/>
        </div>         
     </div>       
     <div className="modalx-data fr">
        <div className="modalx-body">            
          {props.children}                    
        </div>                  
        <div className="modalx-button p-2">    
        <button type="button" style={{cursor: "pointer"}} className="btn btn-secondary" onClick={props.close}>Batal</button>
            <button type="button" style={{marginLeft: 5}} className="btn btn-primary" onClick={props.onClick}>Edit</button>
        </div>
     </div>
    </Modal>
    );
}

export default EditModal;
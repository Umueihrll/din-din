import { useState} from 'react'
import './style.scss'
import editIcon from '../../../assets/lapis.svg'
import deleteIcon from '../../../assets/lixeira.svg'




function TableLine(props) {

    const [idTrash, setIdTrash] = useState(0)
    const [trashModal, setTrashModal] = useState(false)

    async function transactionDel() {
    
        await fetch(`http://localhost:3333/transactions/${idTrash}`, {
          method: 'DELETE'
        });
        props.transactions();
      };

    function deleteLine(){
      transactionDel()

      setTrashModal(false)
      };

    function TrashContainer() {
        function handleClickOpenModal() {
          setTrashModal(false)
        }
        return (
          <div className='container-confirm-delete' id={idTrash}>
            <span>Apagar item?</span>
            <div className='yesNo'>
              <button className='yup'
              onClick={()=>{deleteLine()}} >Sim</button>
              <button className='nope' onClick={handleClickOpenModal}>Não</button>
            </div>
    
          </div>
        )
      };

    return (

      <div className='table-line' id={props.idTransacao}>
        <span className='line-items' id='date'>{props.date}</span>
        <span className='line-items' id='week-day'>{props.day}</span>
        <span className='line-items' id='descricao'>{props.descricao}</span>
        <span className='line-items' id='categoria'>{props.categoria}</span>
        <span className={`line-items ${props.tipo}`} id='value' tipo={props.tipo}>R$ {props.valor}</span>
        <span className='icons'>
          <img alt='' 
          src={editIcon} 
          className='edit-icon'
          id={props.idTransacao}
          onClick={() => { 
            props.setIdEdit(props.idTransacao)
            props.setOpenModalEdit(true) 
            
          }}
          />
          <img alt='' src={deleteIcon} 
          id={props.idTransacao} 
          onClick={()=>{
            setIdTrash(props.idTransacao);
            setTrashModal(true);
          }}
          className='delete-icon'
          />

          {trashModal && idTrash === props.idTransacao && <TrashContainer/>}
          

        </span>
      </div>

      
    )
  };
export default TableLine;
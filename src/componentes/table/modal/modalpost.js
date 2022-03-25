import { useState } from 'react';
import './style.scss'
import btnClose from "../../../assets/closeBtn.svg"
import InputMask from 'react-input-mask'



function Modal({ transactions, setOpenModal }) {
    const [formulario, setFormulario] = useState({});
    const [tipoTransacao, setTipoTransacao] = useState(false);
    
    const type = tipoTransacao?'credit':'debit';
    
    function handleChange({target}) {
  
      setFormulario({...formulario, [target.name]:target.value})
    }
    
    async function postTransacao({value, category, date}){

      if (!date){
        return alert('Preencha a data pra nao dar erro Bença.')
      }

      const arrayDate = formulario.date.split("/");
      const year = arrayDate[2].split('')
      for (let i of year) {
        if (!Number(i) && Number(i) !== 0){
          console.log(Number(i))
          return alert("Insira um ano valido, com 4 digitos")
        }
      }

      if (!value || value === 0 || value === '' ) {
        return alert("O campo Valor precisa ser preenchido e maior que zero!!!");
          
      } else if (!category || category.length < 3 || category === '') {

        return alert("O campo Categoria precisa ser preenchido e ter pelo menos 3 caracteres!!!");
      } else if (Number(arrayDate[0]) > 31) {

        return alert('Insira um dia válido de 01 a 31')
      } else if (Number(arrayDate[1]) > 12) {

        return alert('Insira um mês válido de 01 a 12')
      }
      
      const novaData = new Date(arrayDate[2], String(Number(arrayDate[1]) - 1), arrayDate[0]);
      const dia = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
      const diaSemana = dia[novaData.getDay()];
      
      const dados = {
        date: novaData,
        week_day: diaSemana,
        description: formulario.description,
        value: formulario.value,
        category: formulario.category,
        type: type
      }
      
      await fetch('http://localhost:3333/transactions', {
          method: 'POST',
          headers: {
            "Content-Type": "application/JSON"
          },
          body: JSON.stringify(dados)
        });

        setOpenModal(false)
        transactions();
        setFormulario({})
    }
    
    function handleSubmit(event) {
      
      event.preventDefault();
      postTransacao(formulario);
    }

    return (
      <div className="backdrop" >
        <div className='modal-container'>
          <div className='head'>
          <h1>Adicionar Registro</h1>
          <button onClick={()=> {
            setOpenModal(false)
            setFormulario({})
            setTipoTransacao(false)
            }}className='close-icon'><img src={btnClose} alt='botão fechar'/></button>
          </div>
  
          <div className='operacao'>
            
            <button 
            className={`entrada ${tipoTransacao?'':'nope'}`} 
            id='credit-button' 
            onClick={()=>{
              setTipoTransacao(true)
              
              }}>Entrada</button>
  
            <button 
            className={`saida ${tipoTransacao?'nope':''}`}  
            id='debit-button' 
            onClick={()=>{
              setTipoTransacao(false)
              
              }}>Saída</button>
          </div>
          
          <form className='formulario' onSubmit={handleSubmit}>
            <div className='valor'>
            <label htmlFor='valor'>Valor</label>
            <input 
            id='valor' 
            type='number' 
            name='value' 
            onChange={handleChange}
            value={formulario.value}
            />
            </div>
            <div className='categoria'>
            <label htmlFor='categoria'>Categoria</label>
            <input 
            id='categoria' 
            type='text' 
            name='category' 
            onChange={handleChange}
            value={formulario.category}
            />
            </div>
            <div className='data'>
            <label htmlFor='data'>Data</label>
            <InputMask
            id='data' 
            name='date'
            mask='99/99/9999' 
            onChange={handleChange}
            value={formulario.date}
            />
            </div>
            <div className='descricao'>
            <label htmlFor='descricao'>Descrição</label>
            <input 
            id='descricao' 
            type='text'
            name='description'
            onChange={handleChange}
            value={formulario.description}
            />
            </div>
            
            <button className='btn-insert' type='submit'>Confirmar</button>
          </form>
          
        </div>
      </div>
    )
  };

export default Modal;
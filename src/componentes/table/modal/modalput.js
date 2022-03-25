import { useState } from 'react';
import './style.scss'
import btnClose from "../../../assets/closeBtn.svg"

import InptuMask from 'react-input-mask'

function ModalEdit({ transacoes, transactions, setOpenModalEdit, idEdit }) {

    let transacaoAtual = pegarTransacao()

    const dataDaTransacaoAtual = transacaoAtual.date.split("T")
    
    const arrayDate  = dataDaTransacaoAtual[0].split('-');
    const dataBr = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
    
    transacaoAtual.date = dataBr

    const [formularioEdit, setFormularioEdit] = useState(transacaoAtual);
    
    function handleChange({target}) {
        
      setFormularioEdit({...formularioEdit, [target.name]:target.value})
    
    };

    async function putTransacao( {value, category, date} ){
        
        if (!date) {
            setFormularioEdit({... formularioEdit, date: dataBr})
            return alert('Insira uma data para não dar Erro Bença.') 
        }

        const arrayDate = date.includes('-')?date.split("-"):date.split('/');
        const nDate = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`
        const novaData = new Date(nDate);
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

        } else if (Number(arrayDate[0]) > 31 || Number(arrayDate[0]) < 0) {
            return alert('Insira um dia válido de 01 a 31');

        } else if (Number(arrayDate[1]) > 12 || Number(arrayDate[1]) < 0) {
            return alert('Insira um mês válido de 01 a 12');

        }

        const dia = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const diaSemana = dia[novaData.getDay() + 1];
        
        const dados = {
            date: novaData,
            week_day: diaSemana,
            description: formularioEdit.description,
            value: formularioEdit.value,
            category: formularioEdit.category,
            type: formularioEdit.type
        }

        await fetch(`http://localhost:3333/transactions/${idEdit}`, {
            method:'PUT',
            headers: {
                "Content-Type": "application/JSON"
            },
            body: JSON.stringify(dados)
        });

        transactions();
        setOpenModalEdit(false)
    };

    function handleSubmit(event) {

      event.preventDefault();
      putTransacao(formularioEdit);
    }

    

    function pegarTransacao() {
        const transacaoParaEditar = transacoes.find((t)=>{return t.id === idEdit})
        transacaoParaEditar.date = transacaoParaEditar.date.substring(0, 10)
        return transacaoParaEditar
    }
    
    return (
        <div className="backdrop" >
            <div className='modal-container edit'>
                <div className='head'>
                <h1>Editar Registro</h1>
                <button onClick={()=>{setOpenModalEdit(false)}}
                className='close-icon'><img src={btnClose} alt='botão fechar'/></button>
                </div>

                <div className='operacao'>
                
                <button 
                className={`entrada ${formularioEdit.type == 'credit'?'':'nope'}`} 
                id='credit-button' 
                onClick={()=>{
                    setFormularioEdit({... formularioEdit, type:'credit'})
                    
                    }}>Entrada</button>

                <button 
                className={`saida ${formularioEdit.type == 'credit'?'nope':''}`}  
                id='debit-button' 
                onClick={()=>{
                    setFormularioEdit({... formularioEdit, type:'debit'})
                    
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
                value={formularioEdit.value}
                />
                </div>
                <div className='categoria'>
                <label htmlFor='categoria'>Categoria</label>
                <input 
                id='categoria' 
                type='text' 
                name='category' 
                onChange={handleChange}
                value={formularioEdit.category}
                />
                </div>
                <div className='data'>
                <label htmlFor='data'>Data</label>
                <InptuMask
                id='data' 
                type='text' 
                name='date' 
                onChange={handleChange}
                value={formularioEdit.date}
                mask='99/99/9999'
                />
                </div>
                <div className='descricao'>
                <label htmlFor='descricao'>Descrição</label>
                <input 
                id='descricao' 
                type='text'
                name='description'
                onChange={handleChange}
                value={formularioEdit.description}
                />
                </div>
                
                <button className='btn-insert' type='submit'>Confirmar</button>
                </form>
                
            </div>
        </div>
    )
};

export default ModalEdit;
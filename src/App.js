import { useState, useEffect } from 'react';
import './App.scss';

import filtro from "./assets/filtro.svg"
import setaUp from "./assets/setaFiltro.svg"
import setaDown from "./assets/setaFiltroDown.svg"

import Filters from "./componentes/table/filters/filters"
import Resumo from "./componentes/table/resumo/resumo"
import TableLine from './componentes/table/tableLine/tableLine';
import Modal from './componentes/table/modal/modalpost'
import ModalEdit from './componentes/table/modal/modalput'
import Header from './componentes/header/header'





function App( ) {

  const [valorIn, setValorIn] = useState(0);
  const [valorOut, setValorOut] = useState(0);

  const [openModal, setOpenModal] = useState(false)
  const [transacoes, setTransacoes] = useState([]);

  const [idEdit, setIdEdit] = useState(0)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const [asc, setAsc] = useState(true)
  const [dataOn, setDataOn] = useState(true)
  const [diaDaSemanaOn, setDiaDaSemanaOn] = useState(false)
  const [valorOn, setValorOn] = useState(false)
  
  const [openFiltro, setOpenFiltro] = useState(false)
 
  
  useEffect(()=>{
    atualizaResumo(transacoes)
  }, [transacoes]);

  useEffect(()=>{
    atualizaResumo(transacoes)
   
    transactions();
  },[]);

  function ordenacao(dataTransactions) {
    if (dataOn && !diaDaSemanaOn && !valorOn) {
      asc?
      setTransacoes(dataTransactions.sort((a, b) => {return new Date(a.date) - new Date(b.date)})):
      setTransacoes(dataTransactions.sort((a, b) => {return new Date(b.date) - new Date(a.date)}));
    } else if(!dataOn && diaDaSemanaOn && !valorOn) {
      asc?
      setTransacoes(dataTransactions.sort((a,b) => { return new Date(a.date).getDay() - new Date(b.date).getDay()})):
      setTransacoes(dataTransactions.sort((a,b) => { return new Date(b.date).getDay() - new Date(a.date).getDay()}));
    } else if(!dataOn && !diaDaSemanaOn & valorOn) {
      asc?
      setTransacoes(dataTransactions.sort((a, b) => {return a.value - b.value})):
      setTransacoes(dataTransactions.sort((a, b) => {return b.value - a.value}));
    }

  }

  function atualizaResumo(array) {
    let vrfyEntrada = 0;
    let vrfySaida = 0;
    if (array !== undefined && array.length > 0 ){

      array.map((t) => {
        if (t.type === 'credit') {
          vrfyEntrada += Number(t.value)
        } else if(t.type === 'debit') {
          vrfySaida += Number(t.value)
        }
      });
    }

    setValorIn(Number(vrfyEntrada));
    setValorOut(Number(vrfySaida));
  }

  async function transactions() {
    let getTransactions = await fetch('http://localhost:3333/transactions', {
      method: 'GET'
    });

    const dataTransaction = await getTransactions.json();
    ordenacao(dataTransaction)
    
  };

  function dataConfig(data) {
    
    const apenasData = data.substring(0, 10);
    const arrayData = apenasData.split("-");
    const formatedDate = `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
    return formatedDate;
  };

  function Table() {
    
    
    
  
    return (
      
      <div className="container-header">
        <button class='open-filters-button' onClick={()=>{setOpenFiltro(!openFiltro)}}><img src={filtro}/> Filtrar</button>
        {openFiltro && <Filters 
        transacoes={transacoes}
        setTransacoes={setTransacoes}
        transactions={transactions}
        
        />}
        <div className='trasactions'>
          <div className='table'>
            <div className='table-head'>
              <div className='data'>
              <button 
              className='collum-title' 
              id='date'
              onClick={()=>{
                setAsc(!asc)
                setDataOn(true)
                setDiaDaSemanaOn(false)
                setValorOn(false)
                ordenacao(transacoes)
                }}>
                Data 
                <img src={dataOn?asc?setaUp:setaDown:''}/>
              </button>
              </div>
              <div className='dia-semana'>
              <button 
              className='collum-title' 
              id='week-day' 
              onClick={()=>{
                setAsc(!asc)
                setDataOn(false)
                setDiaDaSemanaOn(true)
                setValorOn(false)
                ordenacao(transacoes)
                }}>
                Dia da Semana 
                <img src={diaDaSemanaOn?asc?setaUp:setaDown:''}/>
              </button>
              </div>
              <div className='descricao'>
              <button 
              className='collum-title' id='descricao'>Descrição</button>
              </div>
              <div className='categoria'>
              <button className='collum-title' id='categoria'>Categoria</button>
              </div>
              <div className='valor'>
              <button 
              className='collum-title' 
              id='value'
              onClick={()=>{
                setAsc(!asc)
                setDataOn(false)
                setDiaDaSemanaOn(false)
                setValorOn(true)
                ordenacao(transacoes)
                }}>
                Valor 
                <img src={valorOn?asc?setaUp:setaDown:''}/>
              </button>
              </div>
            </div>
            <div className='table-body'>
              {transacoes.map((t) => {
                atualizaResumo(transacoes);
                
                return (
                  <TableLine 
                  idTransacao={t.id} 
                  date={dataConfig(t.date)}
                  day={t.week_day} 
                  descricao={t.description} 
                  categoria={t.category} 
                  valor={t.value}
                  tipo={t.type}
                  typeT={t.type}
                  valorT={t.value}
                  transactions={transactions}
                  transacoes={transacoes}
                  idEdit={idEdit}
                  setIdEdit={setIdEdit}
                  setOpenModalEdit={setOpenModalEdit}
                  diaDaSemanaOn={()=>{return diaDaSemanaOn}}
                  dataOn={()=>{return dataOn}}
                  valorOn={()=>{return valorOn}}
                  asc={asc}
                  />
                  
                )
              })}
              
            </div>
          </div>
        </div>
  
        <div className='extrato'>
        <Resumo setOpenModal={setOpenModal} valorIn={valorIn} valorOut={valorOut}/>
        {
        openModal && <Modal 
        setOpenModal={() => {setOpenModal()}} 
        transactions={transactions}  
        dataConfig={dataConfig} 
        transacoes={transacoes}
        />
        }
        { 
        openModalEdit && <ModalEdit
        transactions={transactions}
        setOpenModalEdit={setOpenModalEdit}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
        transacoes={transacoes}
        
        />
        }
        </div>
      </div>
    )
  };

  return (
    <div className="App">
      <Header/>
      <Table/>
    </div>
  );
}

export default App;

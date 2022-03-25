import './style.scss'
import iconFilter from "../../../assets/icon-filter.svg"
import { useState } from 'react/cjs/react.development'

function Filters({ transacoes, setTransacoes, transactions, diaDaSemanaOn, valorOn, dataOn, asc}) {
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  
    
    function limparFiltro() {
        setMinVal(0)
        setMaxVal(0)
        transactions()
        
    };

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

    function aplicarFiltro() {

      let transacoesFiltradas = []
      
      if (minVal !== 0 && maxVal === 0){
        transacoesFiltradas = transacoes.filter((tF) => Number(tF.value) >= minVal)

      } else if (minVal !== 0 && maxVal !== 0){
        transacoesFiltradas = transacoes.filter((tF) => Number(tF.value) >= minVal && Number(tF.value) <= maxVal)

      } else if(minVal === 0 && maxVal !== 0 ){
        transacoesFiltradas = transacoes.filter((tF)=> Number(tF.value) <= maxVal)
      } else if (minVal === 0 && maxVal === 0){
        return 
      } if (minVal > maxVal) {
        return
      }

        setTransacoes(transacoesFiltradas)
        ordenacao(transacoesFiltradas)
        
    }
    
    return (
      <div className='container-filters'>
          <div className='dia-da-semana'>
            <p>Dia da semana</p>
            <div className='btns weekdays'>
              <button id='segunda' className='container-chip'>Segunda <img alt=''src={iconFilter}/></button> 
              <button id='terca' className='container-chip'>Terça <img alt=''src={iconFilter}/></button> 
              <button id='quarta' className='container-chip'>Quarta <img alt=''src={iconFilter}/></button> 
              <button id='quinta' className='container-chip'>Quinta <img alt=''src={iconFilter}/></button> 
              <button id='sexta' className='container-chip'>Sexta <img alt=''src={iconFilter}/></button> 
              <button id='sabado' className='container-chip'>Sábado <img alt=''src={iconFilter}/></button> 
              <button id='domingo' className='container-chip'>Domingo <img alt=''src={iconFilter}/></button> 
            </div>
          </div>
          <div className='futura-implementacao'>
            <h1>Futuras Implementações 😜</h1>
          </div>
          <div className='categoria'>
            <p>Categoria</p>
            <div className='btns categorias'>
              
            </div>
          </div>
          <div className='valor'>
            <p>Valor</p>
            <div className='min-value'>
              <label htmlFor='min-value'>Min</label>
              <input 
              type='number' 
              id='min-value' 
              onChange={({target}) => {
                setMinVal(target.value)
              }} 
              value={minVal}/>
            </div>
            <div className='max-value'>
              <label htmlFor='max-value'>Max</label>
              <input type='number' id='max-value' onChange={({target})=> {setMaxVal(target.value)}} value={maxVal}/>
            </div>
          </div>
          <div className='apply-filters'>
            <button onClick={limparFiltro} className='btn-clear-filters'>Limpar Filtros</button>
            <button onClick={aplicarFiltro} className='btn-apply-filters'>Aplicar Filtros</button>
          </div>
        </div>
    )
  };

  export default Filters
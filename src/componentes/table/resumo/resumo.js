import './style.scss'



function Resumo({valorIn, valorOut, setOpenModal}) {
    

    return (
      <div className="container-resume">
        <h1>Resumo</h1>
        <div className="in">
          <p>Entradas</p> 
          <span id="in">{`R$ ${valorIn}`}</span>
        </div>
        <div className="out">
          <p>Saídas</p> 
          <span id="out">{`R$ ${valorOut}`}</span>
        </div>
        <div className="balance">
          <p>Saldo</p> 
          <span id="balance">{`R$ ${valorIn - valorOut}`}</span>
        </div>
        <button className='btn-add' onClick={() => setOpenModal(true)}>Adicionar Registro</button>
      </div>
    )
  };

  export default Resumo;
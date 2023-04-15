import spinner from '../../assets/Infinity-1.4s-190px.svg'

function Loader() {
  return (
    <img src={spinner} alt="Loading..." 
    style={{width:'100px',margin: 'auto', display: 'block'}}/>
  )
}

export default Loader
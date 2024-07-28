import { useSelector } from "react-redux";
function Timepass(){
    const userdata = useSelector((state) =>  state.userdata);
  
  console.log(userdata[0])
    return(
        
        <>
            <h1>hello</h1>
        </>
    )
}
export default Timepass
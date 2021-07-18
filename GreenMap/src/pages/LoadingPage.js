import {css} from "@emotion/react"
import {GridLoader} from "react-spinners";


const loaderStyle = css`
  display: block;
  margin: auto;
  
`

function LoadingPage(props) {
    const {message} = props
    return <GridLoader color={"green"} css={loaderStyle} size={"100"}/>
}


export default LoadingPage;
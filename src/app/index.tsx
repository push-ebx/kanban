import './styles/index.scss'
import {withRouter} from "./providers/with-router";
import {Routing} from "@/pages";
import {store} from "@/app/store";
import {Provider} from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}

export default withRouter(App);
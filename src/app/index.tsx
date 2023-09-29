import './styles/index.scss'
import {withRouter} from "./providers/with-router";
import {Routing} from "@/pages";
import {store} from "@/app/store";
import {Provider} from "react-redux";

const App = () => {
  store.subscribe(() => {
    try {
      const serialState = JSON.stringify(JSON.stringify(store.getState()));
      localStorage.setItem('appState', serialState);
    } catch(err) {
      console.log(err);
    }
  })

  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}

export default withRouter(App);
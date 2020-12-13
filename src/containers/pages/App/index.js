import RootRouter from "./../../../config/Routers/RootRouter";
import { Provider } from "react-redux";
import store from "./../../../config/redux/store";

function App() {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  )
}

export default App;

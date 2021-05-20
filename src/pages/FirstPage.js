import React, { useEffect, useState } from "react";
import Card from "../components/card";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FirstPage = () => {
  const classes = useStyles();
  const [listState, setListState] = useState([]);
  const [dataDefault, setDataDefualt] = useState([]);
  let dataAll = [];
  const [date, setDate] = useState();
  const [selected, setSelected] = useState();
  const handleChange = (event) => {
    event.preventDefault();
    setSelected(event.target.value);
  };

  const handleAdd = () => {
    if (selected) {
      axios.get("/api/currentprice/" + selected).then(({ data }) => {
        const select = data.bpi;
        const selectArray = Object.values(select);
        setDataDefualt([...dataDefault, selectArray[selectArray.length - 1]]);
      });
    }
    return
  };

  const handleAddAll = async () => {
    const all = listState.map((item) =>
      axios.get(`/api/currentprice/${item.currency}`)
    );
    const res = await axios.all(all);
    const dataBPI = res.map((item) => item.data.bpi);
    const filterlast = dataBPI.map(
      (item) => Object.values(item)[Object.values(item).length - 1]
    );
    dataAll = filterlast;
    const result = [...dataDefault, ...dataAll].filter(
      ({ code }, index, selfs) =>
        selfs.findIndex((self) => self.code === code) === index
    );
    setDataDefualt(result);
  };

  useEffect(() => {
    axios.get("/api/currentprice").then(({ data }) => {
      const item = data.bpi;
      const itemArray = Object.values(item);
      setDataDefualt(itemArray);
      setDate(data.time.updated);
    });
    axios.get("/api/supported-currencies").then(({ data }) => {
      const list = data;
      setListState(list);
    });
  }, []);

  return (
    <div>
      EASY REACT
      <div>Bitcoin Price</div>
      <div>updated : {date}</div>
      <div>
        add cuurrencies :
        <FormControl className={classes.formControl}>
          <NativeSelect value={selected} onChange={handleChange}>
            <option aria-label="None" value="" />
            {listState.map((item, index) => (
              <option key={index} value={item.currency} name={item.currency}>
                {item.currency} : {item.country}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <button onClick={handleAdd}>add</button>
        <button onClick={handleAddAll}>add all</button>
      </div>
      <div>count : {dataDefault.length}</div>
      {dataDefault.map((item, index) => (
        <div key={index}>
          <Card
            title={item.code}
            description={item.description}
            amount={item.rate}
          />
        </div>
      ))}
    </div>
  );
};

export default FirstPage;

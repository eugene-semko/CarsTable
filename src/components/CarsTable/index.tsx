import React, { FC, useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store/dataSlice";
import { StateType } from "../../store";
import { useForm } from "react-hook-form";
import { ReactComponent as ArrowIcon } from "./assets/Arrow.svg";
import classNames from "classnames";

type propsType = {};
export const CarsTable: FC<propsType> = (props) => {
  const { control, getValues } = useForm();
  const dispatch = useDispatch();
  const data = useSelector((state: StateType) => state.dataSlice.data);
  const [sortType, setSortType] = useState<any>(null);
  const [sortedCars, setSortedCars] = useState([...data.cars]);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showSelectedCar, setShowSelectedCar] = useState(false);
  const selectCar = (itemCar: any, itemTariff: any) => {
    setSelectedCar(
      "Выбран автомобиль " +
        itemCar.mark +
        " " +
        itemCar.model +
        " " +
        (itemCar.tariffs[`${itemTariff}`]
          ? itemCar.tariffs[`${itemTariff}`].year
          : "-") +
        " года выпуска"
    );
    setShowSelectedCar(true);
  };

  const searchHandler = () => {
    setSortedCars(
      data.cars.filter((item) => {
        if (
          String(
            item.mark +
              " " +
              item.model +
              " " +
              (item.tariffs
                ? Object.values(item.tariffs).map(
                    (item: any) => item.year + " "
                  )
                : "")
          )
            .toLowerCase()
            .includes(getValues("search").toLowerCase())
        ) {
          return true;
        } else return false;
      })
    );
  };
  if (sortType !== null) {
    sortedCars.sort((a, b) => {
      if (a[sortType.key] < b[sortType.key] && sortType.key == "mark") {
        return sortType.direction === "ascending" ? -1 : 1;
      }
      if (a[sortType.key] > b[sortType.key] && sortType.key == "mark") {
        return sortType.direction === "ascending" ? 1 : -1;
      }

      //undefined tariffs to end

      if (
        sortType.key != "mark" &&
        (a.tariffs[sortType.key] == undefined ||
          b.tariffs[sortType.key] == undefined)
      ) {
        let type = 0;
        if (b.tariffs[sortType.key] != undefined) type = 1;
        if (a.tariffs[sortType.key] != undefined) type = -1;
        return type;
      } else if (
        sortType.key != "mark" &&
        a.tariffs[sortType.key].year < b.tariffs[sortType.key].year
      ) {
        return sortType.direction === "ascending" ? -1 : 1;
      } else if (
        sortType.key != "mark" &&
        a.tariffs[sortType.key].year > b.tariffs[sortType.key].year
      ) {
        return sortType.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (
      sortType &&
      sortType.key === key &&
      sortType.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortType({ key, direction });
  };
  const renderHeader = () => {
    return (
      <>
        <th className="CarsTable__header" onClick={() => requestSort("mark")}>
          <div className="CarsTable__header-content">
            /Марка и модель{" "}
            <ArrowIcon
              className={classNames({
                "CarsTable__header-icon": true,
                "CarsTable__header-icon--rotated":
                  sortType &&
                  sortType.key == "mark" &&
                  sortType.direction == "ascending",
              })}
            />
          </div>
        </th>
        {data.tariffs_list.map((item, index) => {
          return (
            <th
              key={item}
              className="CarsTable__header"
              onClick={() => requestSort(item)}
            >
              <div className="CarsTable__header-content">
                /{item}{" "}
                <ArrowIcon
                  className={classNames({
                    "CarsTable__header-icon": true,
                    "CarsTable__header-icon--rotated":
                      sortType &&
                      sortType.key == item &&
                      sortType.direction == "ascending",
                  })}
                />
              </div>
            </th>
          );
        })}
      </>
    );
  };
  const renderBody = () => {
    return sortedCars.map((itemCar, index) => {
      return (
        <tr key={itemCar.mark + itemCar.model} className="CarsTable__body-tr">
          <td className="Disabled">
            <div className="CarsTable__body-td-item">
              {itemCar.mark + " " + itemCar.model}
            </div>
          </td>
          {data.tariffs_list.map((itemTariff, index) => {
            return (
              <td
                key={itemTariff + index}
                onClick={() => selectCar(itemCar, itemTariff)}
                className="Clickable"
              >
                <div className="CarsTable__body-td-item">
                  {itemCar.tariffs[`${itemTariff}`]
                    ? itemCar.tariffs[`${itemTariff}`].year
                    : "-"}
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  useEffect(() => {
    dispatch(getData());
  }, []);
  useEffect(() => {
    setSortedCars([...data.cars]);
  }, [data]);
  return (
    <div className="CarsTable__wrapper">
      <div className="CarsTable__search-wrapper">
        <input
          {...control.register("search")}
          className="CarsTable__input"
          placeholder="cars/поиск"
        />
        <button className="CarsTable__input-button" onClick={searchHandler}>
          Искать
        </button>
      </div>

      <div
        className={classNames({
          "CarsTable__selected-car": true,
          "CarsTable__selected-car-hidden": !showSelectedCar,
        })}
        onClick={() => setShowSelectedCar(false)}
      >
        <ArrowIcon className="CarsTable__selected-car-icon" />
        {selectedCar && selectedCar}
      </div>
      <table className="CarsTable">
        <thead className="CarsTable__head">
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody className="CarsTable__body">{renderBody()}</tbody>
      </table>
    </div>
  );
};

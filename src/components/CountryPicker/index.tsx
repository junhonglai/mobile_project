import { NavBar, Icon, List } from "antd-mobile";
import { useEffect, useState, TouchEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
// import axios from "axios";
import { reqCountryData } from "../../api/common";
import "./index.less";
const { Item } = List;
interface CoutryType {
  [propName: string]: Coutry[];
}
interface Coutry {
  [propName: string]: string;
}
export default function CountryPicker(props: RouteComponentProps) {
  const [countryData, setCountryData] = useState<CoutryType>({});
  // 发送ajax请求
  useEffect(() => {
    reqCountryData()
      .then((response) => {
        // 将响应回来的数据存放到state中
        setCountryData(response.data.data);
        // console.log(response.data.data, contryData);
        // console.log(Object.keys(countryData));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 给侧边栏绑定点击事件
  const goCountry = (e: TouchEvent) => {
    console.log(e.target);
    // 类型断言
    const text = (e.target as HTMLLIElement).innerText;
    // 类型断言
    const value = (document.getElementById(text) as HTMLElement).offsetTop;
    // console.log(value);
    window.scrollTo(0, value);
  };
  // 给地区项绑定点击事件，跳转到phoneRegister
  const goPhoneRegister: (value: string) => () => void = (value: string) => {
    return () => {
      props.history.push("/phoneRegister", value);
    };
  };
  return (
    <div className="countryPicker-container">
      {/*选择国家或者地区 组件  */}
      <NavBar
        mode="light"
        icon={<Icon type="left" className="phone-icon" />}
        onLeftClick={() => console.log("onLeftClick")}
        className="countryPicker-bar"
      >
        选择国家或者地区
      </NavBar>
      {/* 地区和国家列表项 */}
      <div className="countrylists">
        {Object.keys(countryData).map((key: string) => {
          return (
            <div id={key} key={key}>
              <List renderHeader={() => key} className={key}>
                {countryData[key].map((item: Coutry, index: number) => {
                  // item { '中国': '86' }
                  const key: string = Object.keys(item)[0];
                  const value: string = "+" + item[key];
                  return (
                    <Item
                      extra={value}
                      key={index}
                      onClick={goPhoneRegister(value)}
                    >
                      {key}
                    </Item>
                  );
                })}
              </List>
            </div>
          );
        })}
      </div>
      {/* 右侧侧边栏 */}
      <ul className="countryKey" onTouchEnd={goCountry}>
        {Object.keys(countryData).map((item: string, index: number) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
// function getData(): any {
//   throw new Error("Function not implemented.");
// }

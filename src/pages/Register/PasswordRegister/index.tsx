import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavBar, Icon, InputItem, WingBlank, Button, Toast } from "antd-mobile";
import { reqRegister } from "../../../api/register";
import "./index.less";
import "../../../style/iconfont.css";

// 密码正则
var passwordReg =
  /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

export default function PasswordRegister(props: RouteComponentProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isFirstView, setIsFirstView] = useState<boolean>(true);
  const [isCiphertext, setIsisCiphertext] = useState<boolean>(true);

  //  验证密码
  const changePasswordInput = (password: string) => {
    if (passwordReg.test(password)) {
      setHasError(false);
      setPassword(password);
      setIsFirstView(false);
    } else {
      setHasError(true);
    }
  };

  // 改变密码显示方式
  const changePasswordType = () => {
    setIsisCiphertext(!isCiphertext);
  };

  // 点击下一步,注册用户跳转至手机登录页面
  const goPhoneLogin = async () => {
    try {
      const re = await reqRegister(props.location.state as string, password);
      if (re.data.code === 20000) {
          Toast.success('注册成功，请登录',1)
          props.history.push("/phoneLogin");
      } else {
        Toast.fail(re.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="password-container">
      <NavBar
        mode="light"
        icon={<Icon type="left" className="phone-icon" />}
        onLeftClick={() => {
          props.history.push("/phoneRegister");
        }}
      >
        硅谷注册
      </NavBar>
      <div className="passwordImg"></div>
      <p className="passwordTip">请设置登录密码</p>
      <div className="passwordInput-container-wrapper">
        <div className="passwordInput-container">
          <InputItem
            type={isCiphertext ? "password" : "text"}
            placeholder="请设置8-20位登录密码"
            // clear
            error={hasError}
            onChange={changePasswordInput}
            className="passwordInput"
          ></InputItem>
          <span
            className={
              isCiphertext ? "iconfont icon-hide" : "iconfont icon-browse"
            }
            onTouchEnd={changePasswordType}
          ></span>
        </div>
      </div>
      <WingBlank size="lg">
        <p className="passworddetail">
          密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
        </p>
      </WingBlank>
      <div className="password-next-button-container">
        <Button
          type="primary"
          className="password-next-button"
          disabled={isFirstView || hasError}
          onClick={goPhoneLogin}
        >
          下一步
        </Button>
      </div>
      <p className="customer-service">
        遇到问题？请 <a className="service">&nbsp;&nbsp;联系客服</a>
      </p>
    </div>
  );
}

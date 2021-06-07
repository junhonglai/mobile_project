import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { reqPhoneDigit } from "../../../api/login";
import { reqVerifyCode } from "../../../api/register";
// import { AxiosPromise } from "axios";
import {
  NavBar,
  Icon,
  InputItem,
  Button,
  WhiteSpace,
  Toast,
} from "antd-mobile";
import "./index.less";
const maxTime: number = 5;
const codeReg = /^[0-9]{6}$/;
export default function CodeRegister(props: RouteComponentProps) {
  let [time, setTime] = useState<number>(maxTime);
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [codeError, setCodeError] = useState(false);
  const [code, setCode] = useState<string>("");
  const [isFirstView, setIsFirstView] = useState<boolean>(true);
  // console.log(props.location.state);
  //   console.log(1);

  useEffect(() => {
    if (!isSendCode) {
      reqCode();
      //   return
    }
    setTimeout(() => {
      let Newtime = time - 1;
      if (Newtime <= 0) {
        time = maxTime;
        // setIsFirstSend(false);
        return;
      }
      setIsSendCode(true);
      setTime(Newtime);
    }, 1000);
  }, [time]);
  //   封装请求code方法
  const reqCode: () => Promise<any> = async () => {
    try {
      const phoneCode: unknown = props.location.state;
      await reqPhoneDigit(phoneCode as string);
      // if (!isFirstSend) {
      // 第一次初始化渲染不要设置time的值
      setTime(maxTime);
      // }
      // 代表后面可以不可以发送验证码
      setIsSendCode(true);
      // 第一次默认发送验证码
      // setIsFirstSend(false);
    } catch (err) {
      console.log(err);
    }
  };

  // 验证码校验
  const handleInputChange: (code: string) => void = (code) => {
    if (codeReg.test(code)) {
      // 验证码校验成功
      setCode(code);
      setCodeError(false);
      setIsFirstView(false);
      // 发送请求
    } else {
      setCodeError(true);
    }
  };
  // 发送请求,验证验证码是否正确,并跳转到密码注册页
  const goPasswordRegister = async () => {
    try {
      // 接收手机号
      const phone = props.location.state as string;
      const re = await reqVerifyCode(code, phone);
      // console.log(typeof phone, typeof code);
      if (re.data.code === 20000) {
        props.history.push("/passwordRegister", phone);
      } else {
        Toast.fail(re.data.message, 3);
      }
    } catch (error) {}
  };
  return (
    <div className="code-container">
      <NavBar
        mode="light"
        icon={<Icon type="left" className="phone-icon" />}
        onLeftClick={() => {
          props.history.push("/phoneRegister");
        }}
      >
        硅谷注册
      </NavBar>
      <div className="codeImg"></div>
      <p className="codeTip">
        &nbsp;&nbsp;&nbsp;&nbsp;我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
      </p>
      <div className="codeInput-container">
        <InputItem
          placeholder="请输入手机验证码"
          error={codeError}
          clear
          onChange={handleInputChange}
          className="codeInput"
        ></InputItem>
        <Button
          type="primary"
          size="small"
          className="reCodeBtn"
          onClick={reqCode}
          disabled={time <= 1 ? false : true}
        >
          {time <= 1 ? `重新发送` : `重新发送(${time}s)`}
        </Button>
      </div>
      <WhiteSpace size="lg" />
      <div className="code-nextBtn-container">
        <Button
          type="primary"
          className="code-nextBtn"
          size="large"
          disabled={isFirstView || codeError}
          onClick={goPasswordRegister}
        >
          下一步
        </Button>
      </div>
      <span className="customer-service">
        遇到问题？请&nbsp;&nbsp;&nbsp;
        <a className="contact">联系客服</a>
      </span>
    </div>
  );
}

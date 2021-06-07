import { useEffect, useState } from "react";
import {
  Modal,
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
} from "antd-mobile";
// import { reqPhoneDigit } from "../../../api/login";
import { RouteComponentProps } from "react-router-dom";
import { reqVerifyPhone } from "../../../api/register";
import "../../../style/common.less";
import "../../../style/index.less";
import "./index.css";
const alert = Modal.alert;
// 手机正则
let inputReg = /^1[3-9][0-9]{9}$/;

export default function PhoneRegister(props: RouteComponentProps) {
  // 声明表单验证state
  const [hasError, setHasError] = useState<boolean>(false);
  // 声明按钮不可用state
  const [isDisable, setIsDisable] = useState<boolean>(true);
  // 存放验证通过的手机号，为手机号发送验证码
  const [phonenum, setPhonenum] = useState<string>("");
  // 协议展示
  useEffect(() => {
    if (props.location.state) return;
    // 注册页面弹框
    alert(
      "注册协议及隐私政策",
      <span className="policy-text">
        "在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，"
        <strong className="policy-strong-text">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
        </strong>
        :<span className="policy-item">《硅谷用户注册协议》</span>
        <span className="policy-item">《硅谷隐私政策》</span>
      </span>,
      [
        {
          text: "不同意",
          onPress: () => {
            props.history.push("/phoneLogin");
          },
        },
        {
          text: "同意",
          style: {
            backgroundColor: "red",
            color: "#fff",
          },
        },
      ]
    );
  }, []);
  // 当state有值时，code就是state的值，没有就是默认值+86
  const code: unknown = props.location.state || "+" + 86;
  // console.log(code);
  // 跳转到手机登录组件
  const toPhoneLogin = () => {
    props.history.push("/phoneLogin");
  };
  // 跳转到地区选择组件
  const toCountryPicker = () => {
    props.history.push("/countryPicker");
  };
  // 绑定输入框change事件，对手机号进行校验
  const handleInputChange = (value: string) => {
    // console.log(value)
    console.log(inputReg.test(value));
    if (inputReg.test(value)) {
      setHasError(false);
      // 校验成功将当前手机号存放到state中
      setPhonenum(value);
    } else {
      setHasError(true);
    }
    setIsDisable(false);
  };
  // 手机校验，错误提示
  const onErrorClick = () => {
    if (hasError) {
      Toast.info("手机号码格式不正确，请重新输入");
    }
  };

  // 点击下一步按钮，跳转到验证码验证页面
  const goCodeRegister = async () => {
    try {
      const re = await reqVerifyPhone(phonenum);
      if (re.data.code === 20000) {
        alert("", `我们将发送短信/语音至：${phonenum}`, [
          { text: "不同意" },
          {
            text: "同意",
            onPress: () => props.history.push("/codeRegister", phonenum),
            style: {
              backgroundColor: "red",
              color: "#fff",
            },
          },
        ]);
      }else{
        Toast.fail(re.data.message,3)
      }
    } catch (error) {
      console.log(error);      
    }

    // const verifyCode: unknown = props.location.state;
    // const re = await reqPhoneDigit(verifyCode as string);
    // console.log(re);
  };

  return (
    <div className="phoneRegister-container">
      <NavBar
        mode="light"
        icon={
          <Icon type="left" className="phone-icon" onClick={toPhoneLogin} />
        }
        onLeftClick={() => console.log("onLeftClick")}
      >
        硅谷注册
      </NavBar>
      {/* 输入框 */}
      <WhiteSpace size="xl" />
      <WingBlank size="lg">
        <InputItem
          placeholder="请输入手机号"
          clear
          error={hasError}
          onChange={handleInputChange}
          onErrorClick={onErrorClick}
        >
          <div className="phone-register-inp" onClick={toCountryPicker}>
            <span>{code as string}</span>
            <Icon type="down" className="phone-icon" />
          </div>
        </InputItem>
      </WingBlank>
      <WhiteSpace size="xl" />
      {/* 下一步按钮 */}
      <div className="register-btn">
        <Button
          type="primary"
          className="next-btn"
          disabled={isDisable || hasError}
          onClick={goCodeRegister}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}

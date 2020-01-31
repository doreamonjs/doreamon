import React, { Component } from 'react';
import { connect } from 'dva';

import { Button, Form, Input, Checkbox, Icon, Row, Col } from 'antd';
import { FormProps } from 'antd/lib/form';
import DocumentTitle from 'react-document-title';

export type IUserPass = {
  username: string,
  password: string,
  captcha: string;
};

export type Props = {
  site?: {
    name: string;
    logo: string;
  };
  loading?: boolean;
  captchImage?: string;
  login?(user: IUserPass): void;
  refreshCaptcha(): void;
  parseLoginError?(): void;
};

export type State = {
  autoLogin: boolean;
}

const mapState = ({ applications, authorizations, loading }) => ({
  site: applications.site,
  captchImage: authorizations.captcha,
  loading: loading.models.authorizations, // loading in authorizations
});

const mapActions = dispatch => ({
  login: (user: IUserPass) => dispatch({ type: 'authorizations/login', payload: user }),
  refreshCaptcha: () => dispatch({ type: 'authorizations/refresh/captcha' }),
  parseLoginError: () => dispatch({ type: 'messages/url/error' }),
});

@connect(mapState, mapActions)
@(Form.create as any)()
export class Page extends Component<Props & { form?: FormProps['form'] }, State> {
  static displayName = 'LoginPage';

  static defaultProps = {
    loading: false,
  };

  state = {
    autoLogin: false,
  };

  // private captchaRef = createRef<Input>();

  componentDidMount() {
    // this.props.refreshCaptcha();
    
    window.addEventListener('keydown', this.onPressEnter);

    this.onError();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressEnter);
  }

  onPressEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  // private onCaptcha = async () => {
  //   if (!this.captchaRef.current) return ;

  //   this.captchaRef.current.input.value = '';
  //   this.captchaRef.current.focus();
  // };

  private onError = async () => {
    this.props.parseLoginError!();
  }

  private onValidate = () => this.props.form!.validateFieldsAndScroll((err, values) => {
    if (err) return false;
  })

  private onSubmit = () => this.props.form!.validateFieldsAndScroll((err, values) => {
    if (err) return false;

    return this.props.login!(values);
  });

  private onRefreshCaptcha = () => {
    this.props.refreshCaptcha();
  }

  private onAutoLoginChange = () => this.setState({ autoLogin: !this.state.autoLogin });

  private renderUsernameField = () => {
    const { getFieldDecorator } = this.props.form!;

    return getFieldDecorator('username', {
      rules: [
        { required: true, message: '请输入用户名/邮箱' },
      ],
    })(
      <Input
        size="large"
        placeholder="邮箱/用户名"
        prefix={<Icon className="pages-login__prefix" type="user" />}
        onPressEnter={this.onValidate}
        autoComplete="username"
      />
    );
  };

  private renderPasswordField = () => {
    const { getFieldDecorator } = this.props.form!;

    return getFieldDecorator('password', {
      rules: [
        { required: true, message: '请输入密码' },
      ],
    })(
      <Input
        size="large"
        type="password"
        placeholder="密码"
        prefix={<Icon className="pages-login__prefix" type="lock" />}
        onPressEnter={this.onValidate}
        autoComplete="current-password"
      />
    );
  };

  private renderCaptcha = () => {
    const { captchImage } = this.props;
    const { getFieldDecorator } = this.props.form!;

    const input = getFieldDecorator('captcha', {
      rules: [
        { required: true, message: '请输入验证码' },
      ],
    })(
      <Input
        // ref={this.captchaRef}
        className="pages-login__captcha"
        size="large"
        type="captcha"
        placeholder="验证码"
        prefix={<Icon className="pages-login__prefix" type="safety" />}
        onPressEnter={this.onValidate}
        allowClear={true}
        maxLength={4}
        autoComplete="off"
      />
    );

    return (
      <Row gutter={8}>
        <Col span={16}>
          {input}
        </Col>
        <Col span={8}>
          <img
            className="pages-login__captcha"
            src={captchImage}
            onClick={this.onRefreshCaptcha}
          />
        </Col>
      </Row>
    );
  };

  render() {
    const { site, loading } = this.props;
    const { autoLogin } = this.state;
    const title = `登录 - ${site!.name}`;

    return (
      <div className="doreamonjs pages-login">
        <DocumentTitle title={title} />
        <div className="pages-login__logo">
          {site!.logo && <img className="pages-login__image" alt="" src={site!.logo} />}
          <span className="pages-login__text">{site!.name}</span>
        </div>
        <Form className="pages-login__form">
          <Form.Item hasFeedback={true}>
            {this.renderUsernameField()}
          </Form.Item>
          <Form.Item hasFeedback={true}>
            {this.renderPasswordField()}
          </Form.Item>
          <Form.Item>
            {this.renderCaptcha()}
          </Form.Item>
          <Form.Item>
            <Checkbox checked={autoLogin} onChange={this.onAutoLoginChange}>记住密码</Checkbox>
            <a href="/password_reset" style={{ float: 'right' }}>忘记密码</a>
          </Form.Item>
          <Form.Item>
            <Button className="pages-login__submitBtn" size="large" type="primary" onClick={this.onSubmit} loading={loading}>
              登录
            </Button>
          </Form.Item>
          <div>
            其他登陆方式
            <Icon className="pages-login__connection" type="github" />
            <Icon className="pages-login__connection" type="weibo" />
            <Icon className="pages-login__connection" type="wechat" />
            <a style={{ float: 'right' }} href="/register">注册</a>
          </div>
        </Form>
      </div>
    );
  }
}

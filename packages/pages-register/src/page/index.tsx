import React, { Component } from 'react';
import { connect } from 'dva';

import { Button, Form, Input, Icon, Row, Col } from 'antd';
import { FormProps } from 'antd/lib/form';
import DocumentTitle from 'react-document-title';

import { PREFIX_CLASS } from '../constants';

export type IUserPass = {
  username: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

export type Props = {
  site?: {
    name: string;
    logo: string;
  };
  loading?: boolean;
  register?(user: IUserPass): void;
  sendCaptcha?(user: IUserPass): void;
};

export type State = {
  count: number;
}

const mapState = ({ applications, loading }) => ({
  site: applications.site,
  loading: loading.effects['authorizations/register'],
});

const mapActions = dispatch => ({
  register: (user: IUserPass) => {
    dispatch({ type: 'authorizations/register', payload: user });
  },
  sendCaptcha: (user: IUserPass) => {
    dispatch({ type: 'authorizations/send/captcha/to/email_or_other', payload: user });
  },
});

@connect(mapState, mapActions)
@(Form.create as any)() // @TODO
export class Page extends Component<Props & { form?: FormProps['form'] }, State> {
  static displayName = 'RegisterPage';

  private interval: NodeJS.Timeout | null = null;

  static defaultProps = {
    loading: false,
  };

  state = {
    count: 0,
  };

  private onValidate = () => this.props.form!.validateFieldsAndScroll((err, values) => {
    if (err) return false;
  })

  private onSubmit = () => this.props.form!.validateFieldsAndScroll((err, values) => {
    if (err) return false;

    return this.props.register!(values);
  });

  private onGetCaptcha = () => {
    this.props.form!.validateFields(['username'], (error, values) => {
      if (error) return ;

      // @TODO
      this.props.sendCaptcha!(values);

      let count = 59;
      this.setState({ count });
  
      this.interval = setInterval(() => {
        count -= 1;
        this.setState({ count });
  
        if (count === 0) {
          clearInterval(this.interval as any);
        }
      }, 1000);
    });
  };

  private renderUsernameField = () => {
    const { getFieldDecorator } = this.props.form!;

    return getFieldDecorator('username', {
      rules: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '请输入有效邮箱' },
      ],
    })(
      <Input
        size="large"
        placeholder="邮箱"
        prefix={<Icon className={`${PREFIX_CLASS}__prefix`} type="user" />}
        onPressEnter={this.onValidate}
      />
    );
  };

  private renderPasswordField = () => {
    const { getFieldDecorator } = this.props.form!;

    return getFieldDecorator('password', {
      rules: [
        { required: true, message: '至少6位密码, 区分大小写' },
      ],
    })(
      <Input
        size="large"
        type="password"
        placeholder="至少6位密码, 区分大小写"
        prefix={<Icon className={`${PREFIX_CLASS}__prefix`} type="lock" />}
        onPressEnter={this.onValidate}
      />
    );
  };

  private renderRepeatPasswordField = () => {
    const { getFieldDecorator } = this.props.form!;

    return getFieldDecorator('confirmPassword', {
      rules: [
        { required: true, message: '请输入正确密码' },
      ],
    })(
      <Input
        size="large"
        type="password"
        placeholder="确认密码"
        prefix={<Icon className={`${PREFIX_CLASS}__prefix`} type="lock" />}
        onPressEnter={this.onValidate}
      />
    );
  };

  private renderCaptcha = () => {
    const { getFieldDecorator } = this.props.form!;
    const { count } = this.state;

    const input = getFieldDecorator('captcha', {
      rules: [
        { required: true, message: '请输入验证码' },
      ],
    })(
      <Input
        size="large"
        type="captcha"
        placeholder="验证码"
        prefix={<Icon className={`${PREFIX_CLASS}__prefix`} type="safety" />}
        onPressEnter={this.onValidate}
      />
    );

    return (
      <Row gutter={8}>
        <Col span={14}>
          {input}
        </Col>
        <Col span={10}>
          <Button
            disabled={!!count}
            className={`${PREFIX_CLASS}__sendCaptcha`}
            onClick={this.onGetCaptcha}
          >
            {count ? `${count} s` : '发送验证码'}
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    const { site, loading } = this.props;
    const title = `注册 - ${site!.name}`;

    return (
      <div className={PREFIX_CLASS}>
        <DocumentTitle title={title} />
        <div className={`${PREFIX_CLASS}__logo`}>
          {site!.logo && <img className={`${PREFIX_CLASS}__image`} alt="" src={site!.logo} />}
          <span className={`${PREFIX_CLASS}__text`}>{site!.name}</span>
        </div>
        <form className={`${PREFIX_CLASS}__form`}>
          <Form.Item hasFeedback={true}>
            {this.renderUsernameField()}
          </Form.Item>
          <Form.Item hasFeedback={true}>
            {this.renderPasswordField()}
          </Form.Item>
          <Form.Item hasFeedback={true}>
            {this.renderRepeatPasswordField()}
          </Form.Item>
          <Form.Item>
            {this.renderCaptcha()}
          </Form.Item>
          <Form.Item>
            <Button className={`${PREFIX_CLASS}__submitBtn`} size="large" type="primary" onClick={this.onSubmit} loading={loading}>
              注册
            </Button>
          </Form.Item>
          <div className={`${PREFIX_CLASS}__goLogin`}>
            <span>已有账号？</span>
            <a href="/login">登录</a>
          </div>
        </form>
      </div>
    );
  }
}

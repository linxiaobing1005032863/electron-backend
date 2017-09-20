/**
 * Created by chenlizan on 2017/6/18.
 */

import React  from 'react';
import PropTypes from 'prop-types';
import {Icon, Layout, Menu, Spin, Dropdown} from 'antd';
import {logout_controller} from '../controllers/Users/Logout'
import {myInfo_controller} from '../controllers/Users/Person';
const {Content, Header, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class Home extends React.Component {

    static contextTypes = {
        router: PropTypes.object
    };

    static propTypes = {};

    state = {
        collapsed: false,
        content: null,
        mode: 'inline',
        name: '',
        realName: '',
        loading: false,
    };

    showMyInfo = () => {
        myInfo_controller((err, values) => {
            if (err) {
                this.setState({
                    loading: true,
                    name: values.account,
                    realName: values.personInfo.realName,
                })
            }
        });
    };

    componentWillMount() {
        this.showMyInfo();
    }

    onClick(clicked) {
        switch (clicked.key) {
            case '1' :
                this.context.router.push('/home/person');
                break;
            case '2' :
                this.context.router.push('/home/organize');
                break;
            case '3' :
                this.context.router.push('/home/task');
                break;
            case '4' :
                this.context.router.push('/home/password');
                break;
            case '5' :
                this.context.router.push('/home/changeWrap');
                break;
            case '6' :
                this.context.router.push('/home/log');
                break;
            case '7' :
                this.context.router.push('/home/createIndent');
                break;
            case '8' :
                this.context.router.push('/home/createProduct');
                break;
            case '9' :
                this.context.router.push('/home/shippingList');
                break;
            case '10' :
                this.context.router.push('/home/installList');
                break;
            case '11' :
                this.context.router.push('/home/field');
                break;
            case '12' :
                this.context.router.push('/home/code');
                break;
            case '13':
                this.context.router.push('/home/ConfirmOrder');
                break;
            case '14':
                this.context.router.push('/home/Distribution');
                break;
            default:
                return this.context.router.push('/home');
        }
    }

    logout = () => {
        logout_controller((err, values) => {
            if (err) {
                localStorage.removeItem("token");
                return this.context.router.push('/login');
            }
        });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: this.state.collapsed ? 'inline' : 'vertical',
        });
    };
    handleMenuClick = () => {
        this.logout();
    };

    render() {
        const {name, realName, loading} = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">退出登录</Menu.Item>
                <Menu.Item key="2">我的资料</Menu.Item>
                <Menu.Item key="3">为我点赞</Menu.Item>
            </Menu>

        );
        if (loading) {
            return (
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className="logo"/>
                        <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['0']}
                              onClick={this.onClick.bind(this)}>
                            <Menu.Item key="0">
                            <span>
                                <Icon type="meh-o"/>
                                <span className="nav-text">摘要</span>
                            </span>
                            </Menu.Item>
                            <SubMenu key="sub1"
                                     title={<span><Icon type="setting"/><span className="nav-text">我的</span></span>}>
                                <Menu.Item key="1">个人信息</Menu.Item>
                                <Menu.Item key="2">组织机构</Menu.Item>
                                <Menu.Item key="3">我的任务</Menu.Item>
                                <Menu.Item key="4">修改密码</Menu.Item>
                                <Menu.Item key="5">手机/邮箱</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2"
                                     title={<span><Icon type="setting"/><span className="nav-text">系统</span></span>}>
                                <Menu.Item key="6">查看日志</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3"
                                     title={<span><Icon type="setting"/><span className="nav-text">订单</span></span>}>
                                <Menu.Item key="7">创建订单</Menu.Item>
                                <Menu.Item key="8">创建产品</Menu.Item>
                                <Menu.Item key="9">发货</Menu.Item>
                                <Menu.Item key="10">产品安装</Menu.Item>
                                <Menu.Item key="13">订单草稿</Menu.Item>
                                <Menu.Item key="14">订单配货</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4"
                                     title={<span><Icon type="setting"/><span className="nav-text">编码</span></span>}>
                                <Menu.Item key="11">创建字典</Menu.Item>
                                <Menu.Item key="12">创建规则</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <span className="logout">
                        <Icon type="user"/>
                        <span className="nav-text">{realName == null ? name : realName}欢迎您！</span>
                        </span>
                            <div className="tip">
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#">
                                        <Icon type="down"/>
                                    </a>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            );
        } else {
            return <Spin size="large"/>
        }

    }
}

export default Home;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TextInput,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import styles from './styles';
import dp2px from '../../../../utils/util';

/**
    信息录入的列表项组件
 
    列表项属性说明：
    type：''. // text 文字点击，input 输入框，switch 开关, select 单选，counter 计数器, termSelect 租期选择, buttonGroup 分组单选按钮, dateTime 日期时间选择器
    title: '', //左边标题
    content: '', //右边文字内容
    contentType: '',/输入的文字类型, 默认为文本，decimal为数字保留两位小数, 
    hint: '', //输入框、单选、计数器类型时的默认值
    isNecessary：''. //boolean 是否必填
    isSwitchOn:'', //开关状态 true打开，false关闭
    isTopLine: true, //顶部横线，默认显示
    isBottomLine: false, //底部横线，默认不显示

    onPress: //文字、单选、租期选择 回调接口
    onSwitchChange://开关 回调接口
    onDateChange: //日期时间选择器 回调接口
    onChangeText： //输入框 回调接口
    onButtonGroupSelected： //分组单选按钮 回调接口
*/

export default class FillItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      selectedIndex: this.props.selectedIndex,
      date: '',
    };
  }

  // 分割线
  line = () => {
    return <View style={styles.line} />;
  };

  title = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {this.props.isNecessary ? <Entypo name="star" size={8} color="red" /> : null}
        <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
      </View>
    );
  };

  text = () => {
    return (
      <Text
        style={[
          styles.content,
          {
            color: this.props.contentColor ? this.props.contentColor : 'rgba(170,170,170,1)',
          },
        ]}
        onPress={() => this.onPress()}
      >
        {this.props.content}
      </Text>
    );
  };

  onPress = () => {
    this.props.onPress();
  };

  onButtonGroupSelected = selectedIndex => {
    this.setState({ selectedIndex });
    this.props.onButtonGroupSelected(selectedIndex);
  };

  onSwitchChange = status => {
    this.props.onSwitchChange(status);
  };

  showCancelButton = () => {
    if (!this.state.content) {
      return null;
    }
    return (
      <TouchableOpacity
        style={{ padding: dp2px(5) }}
        onPress={() => {
          const empty = '';
          this.props.onChangeText(empty);
          this.setState({ content: empty });
        }}
      >
        <Image
          source={require('../../../../assets/images/lock_right_icon.png')}
          style={styles.next}
        />
      </TouchableOpacity>
    );
  };

  onChangeText = text => {
    if (this.props.contentType === 'decimal') {
      let newText = text !== '' && text.substr(0, 1) === '.' ? '' : text;
      newText = newText.replace(/^0+[0-9]+/g, '0'); // 不能以0开头输入
      newText = newText.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
      newText = newText.replace(/\.{2,}/g, '.'); // 只保留第一个, 清除多余的
      newText = newText
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.');
      newText = newText.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      this.setState({ content: newText });
    } else {
      this.setState({ content: text });
    }
    this.props.onChangeText(text);
  };

  showInputText = () => {
    let type = 'default';
    if (this.props.contentType === 'decimal') {
      type = 'numeric';
    }

    return (
      <TextInput
        keyboardType={type}
        style={styles.content}
        placeholder={this.props.hint}
        value={this.state.content}
        onChangeText={text => this.onChangeText(text)}
      />
    );
  };

  // 输入框
  input = () => {
    return (
      <View style={styles.contentRight}>
        <View style={styles.radius} />
        {this.showInputText()}
        {this.showCancelButton()}
      </View>
    );
  };

  onValueChange = status => {
    this.props.switch = status;
    this.props.onSwitchChange(status);
  };

  // 开关
  switch = () => {
    return (
      <Switch
        trackColor="rgba(13,189,199,1)"
        thumbColor="white"
        value={this.props.isSwitchOn}
        onValueChange={status => {
          this.onValueChange(status);
        }}
      />
    );
  };

  // 单选
  select = () => {
    return (
      <TouchableOpacity style={styles.contentRight} onPress={() => this.onPress()}>
        <Text style={styles.content}>
          {this.props.content ? this.props.content : this.props.hint}
        </Text>
        <Image
          source={require('../../../../assets/images/ad_arrow.png')}
          style={[styles.next, { marginLeft: dp2px(5) }]}
        />
      </TouchableOpacity>
    );
  };

  // 计数器
  counter = () => {
    console.log(`content: ${this.state.content}`);
    return (
      <View style={styles.contentRight}>
        <TouchableOpacity
          onPress={() => {
            const { content } = this.state;
            let count = Number(content);
            if (count === 0) {
              return;
            }
            count -= 1;
            this.setState({ content: count.toString() });
          }}
        >
          <Icon name="minussquareo" size={25} color="rgba(216, 216, 216, 1)" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            marginLeft: dp2px(15),
            marginRight: dp2px(15),
            color: this.props.contentColor ? this.props.contentColor : 'rgba(170,170,170,1)',
          }}
        >
          {this.state.content ? this.state.content : this.props.hint}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const { content } = this.state;
            let count = Number(content);
            count += 1;
            this.setState({ content: count.toString() });
          }}
        >
          <Icon name="plussquareo" size={25} color="rgba(216, 216, 216, 1)" />
        </TouchableOpacity>
      </View>
    );
  };

  // 租期选择
  termSelect = () => {
    const rentTermArray = ['1个月', '3个月', '半年', '一年'];
    return (
      <View style={{ flexDirection: 'row' }}>
        {rentTermArray.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.termSelect,
                index === this.props.position
                  ? { borderColor: 'rgba(54,199,208,1)' }
                  : { borderColor: 'rgba(170,170,170,1)' },
              ]}
              onPress={() => this.onPress()}
              key={item}
            >
              <Text
                style={
                  index === this.props.position
                    ? { color: 'rgba(54,199,208,1)' }
                    : { color: 'rgba(170,170,170,1)' }
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // 分组单选按钮
  buttonGroup = () => {
    const { buttons, width } = this.props;
    const { selectedIndex } = this.state;

    return (
      <ButtonGroup
        onPress={index => this.onButtonGroupSelected(index)}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          height: 30,
          width,
          borderColor: 'rgba(13,189,199,1)',
          borderWidth: dp2px(1),
          marginRight: 0,
        }}
        textStyle={{ fontSize: 14, color: 'rgba(55, 202, 210, 1)' }}
        selectedTextStyle={{ color: 'white' }}
        selectedButtonStyle={{ backgroundColor: 'rgba(13,189,199,1)' }}
      />
    );
  };

  // 日期时间选择器
  dateTime = () => {
    let placeholder = '选择日期';
    let format = 'YYYY-MM-DD';
    let width = 142;
    if (this.props.mode === 'date') {
      placeholder = '选择日期';
      format = 'YYYY-MM-DD';
      width = 110;
    } else if (this.props.mode === 'datetime') {
      placeholder = '选择日期/时间';
      format = 'YYYY-MM-DD HH:mm';
      width = 155;
    } else if (this.props.mode === 'time') {
      placeholder = '选择时间';
      format = 'HH:mm';
      width = 110;
    }

    return (
      <DatePicker
        style={{ width }}
        date={this.state.date}
        mode={this.props.mode}
        placeholder={placeholder}
        androidMode="spinner"
        format={format}
        confirmBtnText="确定"
        cancelBtnText="取消"
        showIcon
        iconSource={require('../../../../assets/images/ad_arrow.png')}
        minDate="2015-01-01"
        maxDate="2025-12-31"
        customStyles={{
          dateIcon: styles.next,
          dateInput: { borderWidth: 0, alignItems: 'flex-end' },
          dateText: { color: 'rgba(170, 170, 170, 1)', fontSize: 15 },
          placeholderText: { color: 'rgba(170, 170, 170, 1)', fontSize: 15 },
        }}
        minuteInterval={10}
        onDateChange={date => {
          this.setState({ date });
          this.props.onDateChange(date);
        }}
      />
    );
  };

  render() {
    return (
      <View>
        {this.props.isTopLine === true && this.line()}
        <View style={styles.container}>
          {this.props.type === 'termSelect' && this.termSelect()}
          {this.props.type !== 'termSelect' && this.title()}
          {this.props.type === 'text' && this.text()}
          {this.props.type === 'input' && this.input()}
          {this.props.type === 'switch' && this.switch()}
          {this.props.type === 'select' && this.select()}
          {this.props.type === 'counter' && this.counter()}
          {this.props.type === 'buttonGroup' && this.buttonGroup()}
          {this.props.type === 'dateTime' && this.dateTime()}
        </View>
        {this.props.isBottomLine === true && this.line()}
      </View>
    );
  }
}

FillItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentColor: PropTypes.string, // 右侧文字颜色
  hint: PropTypes.string,
  isNecessary: PropTypes.bool,
  isSwitchOn: PropTypes.bool,
  onPress: PropTypes.func,
  onSwitchChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onButtonGroupSelected: PropTypes.func,
  contentType: PropTypes.string, // 输入框文字类型
  isTopLine: PropTypes.bool, // 顶部横线
  isBottomLine: PropTypes.bool, // 底部横线
  position: PropTypes.number, // 租期选择
  buttons: PropTypes.arrayOf(PropTypes.string), // 分组单选按钮
  selectedIndex: PropTypes.number, // 分组单选按钮
  width: PropTypes.number, // 分组单选按钮
  mode: PropTypes.string, // 显示的模式，date,datetime,time
  format: PropTypes.string,
  onDateChange: PropTypes.func,
  titleStyle: ViewPropTypes.style, // 标题样式
};

FillItem.defaultProps = {
  onPress: () => {},
  onSwitchChange: booleanValue => {
    console.log(`onSwitchChange: ${booleanValue}`);
  },
  onChangeText: text => {
    console.log(`onChangeText: ${text}`);
  },
  onButtonGroupSelected: selectedIndex => {
    console.log(`onButtonGroupSelected: ${selectedIndex}`);
  },
  content: '',
  contentColor: '',
  hint: '',
  isNecessary: false,
  isSwitchOn: false,
  contentType: '',
  isTopLine: true,
  isBottomLine: false,
  position: 3,
  buttons: ['请', '设', '置', '按', '钮'],
  selectedIndex: 0,
  width: 200,
  mode: 'date',
  format: 'YYYY-MM-DD',
  onDateChange: date => {
    console.log(`onDateChange: ${date}`);
  },
  titleStyle: {},
};

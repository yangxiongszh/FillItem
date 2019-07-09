# FillItem

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

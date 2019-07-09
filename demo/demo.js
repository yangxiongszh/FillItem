  // 相关信息
  renderTenantInfos = () => {
    return (
      <FillItem
        {...item}
        onPress={() => this.onItemPress(item, index)}
        onSwitchChange={status => this.onSwitchChange(item.title, status)}
		onButtonGroupSelected={index => {}}
		onChangeText={text => {this.onChangeText(item, text);}}
        key={item.title + item.type}
      />
    );
  };

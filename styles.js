import { StyleSheet } from 'react-native';
import dp2px from '../../../../utils/util';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: dp2px(50),
    backgroundColor: 'white',
    paddingLeft: dp2px(15),
    paddingRight: dp2px(15),
  },
  line: {
    height: dp2px(1),
    width: '100%',
    backgroundColor: 'rgba(236,236,236,1)',
  },
  title: {
    fontSize: 15,
    color: 'rgba(72,72,72,1)',
    fontWeight: '400',
  },
  contentRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 15,
    color: 'rgba(170,170,170,1)',
    fontWeight: '400',
  },
  next: {
    width: dp2px(15),
    height: dp2px(15),
  },
  termSelect: {
    borderWidth: dp2px(1),
    borderColor: 'rgba(170, 170, 170, 1)',
    borderRadius: dp2px(18),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: dp2px(36),
    marginLeft: dp2px(5),
    marginRight: dp2px(5),
  },
  radius: {
    backgroundColor: 'rgba(216, 216, 216, 1)',
    width: dp2px(5),
    height: dp2px(5),
    borderRadius: dp2px(2.5),
    marginRight: dp2px(8),
  },
});

export default styles;

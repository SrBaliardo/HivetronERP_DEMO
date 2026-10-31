import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 30,
  },

  sectionHeader: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  image: {
    width: '30%',
    alignSelf: 'center',
  },

  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6c7883',
  },

  titleSection: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c7883',
    marginBottom: 20,
  },

  headerIntersection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
  },

  section: {
    width: '100%',
    marginBottom: 30,
    paddingBottom: 10,
    paddingRight: 5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },

  intersection1: {
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
    gap: 3,
  },

  intersection2: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    left: 150,
  },

  intersection3: {
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    left: 150,
  },

  text: {
    fontSize: 8,
    color: '#333333',
    overflowWrap: 'break-word',
  },

  label: {
    fontSize: 8,
    color: '#b85b00',
  },

  item: {
    paddingBottom: 10,
    marginBottom: 15,
    borderBottomWidth: 0.9,
    borderBottomColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  intersectionItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
  },

  intersectionItem1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  intersectionItem2: {
    width: '100%',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    left: -25,
  },

  intersectionItem3: {
    width: '100%',
    marginLeft: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    left: -55,
  },

  intersectionItem4: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    left: -35,
  },

  sectionRelease: {
    width: '100%',
    marginBottom: 20,
    paddingBottom: 10,
    paddingRight: 5,
    borderBottomWidth: 0.9,
    borderBottomColor: '#E0E0E0',
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },

  footer: {
    fontSize: 10,
    marginTop: 30,
    textAlign: 'center',
    color: '#666666',
  },
});

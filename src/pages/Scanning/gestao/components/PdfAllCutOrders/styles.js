import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  demonstrationNotice: {
    fontSize: 9,
    color: '#6c7883',
    marginBottom: 12,
  },
  headerIntersection: {
    flexGrow: 1,
    maxWidth: 340,
    alignItems: 'flex-end',
    gap: 6,
  },
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
    width: 150,
    height: 42,
    objectFit: 'contain',
    alignSelf: 'center',
  },

  titleHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6c7883',
    textAlign: 'right',
  },

  titleSection: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6c7883',
  },

  blockSection: {
    width: '100%',
    marginBottom: 30,
    paddingBottom: 10,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    gap: 5,
  },

  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },

  intersection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  text: {
    fontSize: 8,
    color: '#333333',
  },

  label: {
    fontSize: 8,
    color: '#b85b00',
  },

  footer: {
    fontSize: 10,
    marginTop: 30,
    textAlign: 'center',
    color: '#666666',
  },
});

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
    marginBottom: 20,
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6c7883',
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6c7883',
    marginTop: 5,
    marginBottom: 3,
  },

  blockSection: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 10,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E0E0E0',
    gap: 3,
  },

  blockSection2: {
    width: '100%',
    marginBottom: 5,
    paddingBottom: 5,
    paddingRight: 5,
    display: 'flex',
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    gap: 3,
  },

  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 3,
  },

  intersection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  intersectionInner: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    gap: 3,
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

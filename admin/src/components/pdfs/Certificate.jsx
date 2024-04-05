import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF" // Set background color if needed
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  }
});

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    // Add other font variants as needed
  ],
});

// Create Document Component
const Certificate = ({ course, user }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.container}>
              <Image src="images\certificate.jpg" style={styles.image} />
          
              <View style={styles.content}>
                {/* <Text style={styles.text}>{course._id}</Text> */}
                <Text style={styles.text}>{user.username}</Text>
                <li>
                <Text style={styles.text}>{course?.category.category_name}</Text>
                </li>
                
              </View>
            
            </View>
          </Page>
        </Document>
      }
      fileName="Contract"
      className="bg-purple-500 border-[0.1rem] border-purple-500 text-gray-50 text-base flex items-center justify-center size-10 rounded-full focus:border-2 focus:border-purple-200 outline-none"
    >
      {({ loading }) =>
        loading ? (
          <button>creating</button>
        ) : (
          <button>Certificate</button>
        )
      }
    </PDFDownloadLink>
  );
};

export default Certificate;

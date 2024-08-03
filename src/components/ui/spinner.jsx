import { RiseLoader } from "react-spinners"
import PropTypes from "prop-types";

const override = {
    display: "block",
    margin: "100px auto",
}

const Spinner = ({ loading }) => {
  return (
    <RiseLoader
    loading={loading}
    color = "#ffffff"
    cssOverride={override}
    size={20}
    />
  )
}

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
}

export default Spinner
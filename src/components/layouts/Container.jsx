import PropTypes from "prop-types";

export default function Container({ type = "", moreClasses = "", children }) {
  // tratando o type
  let containerType = type != "" ? `-${type}` : "";
  //children é uma prop especial que representa o conteúdo aninhado dentro de um componente React.
  return (
    <div className={`container${containerType} ${moreClasses}`}>{children}</div>
  );
}

Container.propTypes = {
  // o type só aceitar os tipos informados no array
  type: PropTypes.oneOf(["fluid", "sm", "md", "lg", "XMLDocument", "xxl"]),
  moreClasses: PropTypes.string,
  children: PropTypes.node,
};

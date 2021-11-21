import styled from 'styled-components';

interface ButtonTypes {
    width?: any;
    border?: string;
    backgroundColor?: string;
    color?: string;
    marginRight?: string;
    marginLeft?: string;
    flex?: string;
    boxShadow?: string;
    opacity?: string;
}

export const Button = styled.button<ButtonTypes>({
    padding: "0.375rem 0.75rem",
    display: "inline-block",
    backgroundColor: "#0177fa",
    color: "white",
    boxShadow: "0px 0px 20px rgba(1, 119, 250, 0.25)",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150% !important",
    border: "2px solid #0177fa"
}, (props: ButtonTypes) => {
    return {
        border: `${props.border}`,
        width: `${props.width} !important`,
        backgroundColor: `${props.backgroundColor}`,
        color: `${props.color}`,
        flex: `${props.flex}`,
        marginRight: `${props.marginRight}`,
        marginLeft: `${props.marginLeft}`,
        boxShadow: `${props.boxShadow}`,
        opacity: `${props.opacity}`
    }
}
)
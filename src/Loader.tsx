import React, {ReactNode} from "react";
import {ContextFunctionData, TableData} from "./contextTypes";

export enum LoadingIcon {
	CIRCLE,
	DEFAULT,
	DUAL_RING,
	ELLIPSIS,
	FACEBOOK,
	GRID,
	HEART,
	HOURGLASS,
	RING,
	RIPPLE,
	ROLLER,
	SPINNER,
}

export interface ILoaderProps {
	loadingIcon?: LoadingIcon;
	loadingOverlay?: ContextFunctionData<ReactNode>;
	data?: TableData;
}

export interface IDefaultLoaderConfig {
	className: string;
	divs: number;
}

function getLoadingIconClassName(icon: LoadingIcon): IDefaultLoaderConfig {
	switch (icon) {
		case LoadingIcon.CIRCLE:
			return {
				className: "lds-circle",
				divs: 1,
			};
		case LoadingIcon.DEFAULT:
		default:
			return {
				className: "lds-default",
				divs: 12,
			};
		case LoadingIcon.DUAL_RING:
			return {
				className: "lds-dual-ring",
				divs: 0,
			};
		case LoadingIcon.ELLIPSIS:
			return {
				className: "lds-ellipsis",
				divs: 4,
			};
		case LoadingIcon.FACEBOOK:
			return {
				className: "lds-facebook",
				divs: 3,
			};
		case LoadingIcon.GRID:
			return {
				className: "lds-grid",
				divs: 9,
			};
		case LoadingIcon.HEART:
			return {
				className: "lds-heart",
				divs: 1,
			};
		case LoadingIcon.HOURGLASS:
			return {
				className: "lds-hourglass",
				divs: 0,
			};
		case LoadingIcon.RING:
			return {
				className: "lds-ring",
				divs: 4,
			};
		case LoadingIcon.RIPPLE:
			return {
				className: "lds-ripple",
				divs: 2,
			};
		case LoadingIcon.ROLLER:
			return {
				className: "lds-roller",
				divs: 8,
			};
		case LoadingIcon.SPINNER:
			return {
				className: "lds-spinner",
				divs: 12,
			};
	}
}

const Loader: React.FC<ILoaderProps> = (props) => {

	const defaultLoadingConfig: IDefaultLoaderConfig = getLoadingIconClassName(props.loadingIcon);

	function getExtraDivs(divs: number): ReactNode[] {
		const fillerDivs: Array<ReactNode> = [];

		let i: number;
		for (i = 0; i < divs; i++) {
			fillerDivs.push(<div/>);
		}

		return fillerDivs;
	}

	return (
		<div
			className="frame-one-table-loader"
			style={{
				position: props.data?.length > 0 ? "absolute" : "inherit"
			}}
		>
			{props.loadingOverlay ? (
				<React.Fragment>
					{props.loadingOverlay(props.data)}
				</React.Fragment>
			) : (
				<div className={defaultLoadingConfig.className}>
					{getExtraDivs(defaultLoadingConfig.divs)}
				</div>
			)}
		</div>
	);
};

export default Loader;

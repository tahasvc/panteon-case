import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "../global.scss";
const { Grid, GridColumn } = require('@progress/kendo-react-grid');
const ENDPOINT = "https://server-jvekc5ttbq-uc.a.run.app/";

const TopList = () => {
    const cellWithBackGround = (props) => {
        const diff = props.dataItem.dailyDiff;
        let icon;
        let style;
        if (diff == 0) {
            icon = (<span className="k-icon k-i-minus-sm" />);
            style = { color: "rgb(221,247,48)" }
        }

        else if (diff > 0) {
            icon = (<span className="k-icon k-i-sort-asc-sm" />);
            style = { color: "rgb(0,128,0)" }
        }

        else {
            icon = (<span className="k-icon k-i-sort-desc-sm" />);
            style = { color: "rgb(255,0,0)" }
        }

        return (
            <td style={style}>
                {diff} {icon}
            </td>
        );
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const socket = socketIOClient(ENDPOINT);
            socket.on("getTopListEmit", data => {
                setData(data.data);
            });
        }

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
            }}>
                <div style={{ background: "rgba(0,0,0,0.5)", borderRadius: 20, padding: 15, marginTop: "1%" }}>
                    <img src="./logo-panteon.png"></img>
                </div>
                <div>
                    <Grid
                        style={{
                            left: "25%",
                            width: "50%",
                            marginTop: "3%",
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        data={data}
                    >

                        <GridColumn field="rank" title="Rank" width="55%" />
                        <GridColumn field="player.name" title="Username" />
                        <GridColumn field="player.country" title="Country" />
                        <GridColumn field="money" title="Money" />
                        <GridColumn field="dailyDiff" title="Daily Diff" cell={cellWithBackGround} />

                    </Grid>
                </div>
            </div>
        </React.Fragment>
    )
}

export default TopList;
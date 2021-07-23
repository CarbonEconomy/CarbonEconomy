import { Link, Typography, withStyles } from "@material-ui/core";
import { colors } from "./Colors";
import CarbonEconomyLogo from "../layouts/CarbonEconomy.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";

const ThemedTypography = withStyles({
  root: {
    color: colors.darkGreen,
  },
})(Typography);

export const dialogTitleContent = (
  <ThemedTypography variant={"h1"}>GreenMap</ThemedTypography>
);

const dialogText = (
  <>
    <ThemedTypography variant="subtitle1">
      <b>
        With GreenMap, you can explore how GreenCredits are being used around
        our island.
      </b>
    </ThemedTypography>
    <br />
    <ThemedTypography variant={"h3"}>Features</ThemedTypography>
    <br />
    <ThemedTypography variant={"body1"}>
      The notifications you see on the left are real transactions made by
      people.{" "}
      <b>Every GreenCredit counts towards making us better GreenConsumers.</b>
      <br />
      <ul>
        <li>
          Want to see which part of the island the transaction was made? <br />{" "}
          Hover (or tap if you are on your phone) and you will fly to that
          neighbourhood.
        </li>
        <li>
          The GreenCredit inflow for every couple of blocks is represented by a
          stack.
          <b>
            The taller the stack, the more GreenCredit has flowed into that
            area.
          </b>
        </li>
        <li>
          Hover over the respective point to see more details about how the
          transaction was made and get some insight into how others are playing
          their part in this effort.
        </li>
      </ul>
    </ThemedTypography>
    <br />
    <ThemedTypography variant={"h3"}>Controls</ThemedTypography>
    <br />

    <ThemedTypography variant={"body1"}>
      On the right, you will find some <b>interactive controls</b>.
      <ul>
        <li>
          Check the boxes you want to showcase specific <b>layers</b> and
          explore interesting points of view.
        </li>
        <li>
          Finally, we have a control slider. Pause the notifications by sliding
          it all the way to the bottom or quicken it if you so wish. This
          changes the period at which we poll for newer transactions (this is a
          lie).
        </li>
      </ul>
    </ThemedTypography>
    <br />

    <ThemedTypography variant={"h3"}>Layers</ThemedTypography>
    <br />
    <ThemedTypography variant="h5">Arcs</ThemedTypography>

    <ThemedTypography variant={"body1"}>
      Want to find out more about where the GreenCredits came from? <br />
      Enable the <b>Arcs</b> Layer and find out about the source.
    </ThemedTypography>
    <br />
    <ThemedTypography variant="h5">HeatMap</ThemedTypography>
    <ThemedTypography variant={"body1"}>
      Want to add some colours and see things from a bigger picture? <br />
      Enable the HeatMap to visualise density of GreenCredit inflow.
    </ThemedTypography>
    <br />
    <ThemedTypography variant={"h6"}>
      <b>
        We at CarbonEconomy hope that GreenMap helps us all find the direction
        to a Greener Future.
      </b>
      <br />
      <img src={CarbonEconomyLogo} alt={"CarbonEconomyLogo"} />
      <ThemedTypography variant={"body2"}>
        <Link href={"https://github.com/CarbonEconomy/CarbonEconomy"}>
          <GitHubIcon fontSize={"large"} />
        </Link>
      </ThemedTypography>
    </ThemedTypography>
  </>
);

export default dialogText;

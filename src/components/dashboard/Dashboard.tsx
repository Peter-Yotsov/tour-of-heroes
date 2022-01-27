import * as React from "react";
import { FunctionComponent, useEffect, useRef, useState } from "react";

import { HeroService } from "src/app/hero.service";
import { Hero } from "src/app/hero";

import DatePicker from "react-datepicker";
import styled from "styled-components";

import "./Dashboard.css";
import "react-datepicker/dist/react-datepicker.css";

export interface IDashboardProps {
  heroService: HeroService;
  option1: string;
  option2: string;
  option3: string;
  router?: any;

  handleClick?: (event: any) => any;
}

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const Dashboard: FunctionComponent<IDashboardProps> = (
  props: IDashboardProps
) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const { heroService, router } = props;

  useEffect(() => {
    heroService
      .getHeroes()
      .subscribe((apiHeroes) => setHeroes(apiHeroes.slice(1, 5)));
  }, [heroService]);

  const { handleClick, option1, option2, option3 } = props;

  const route = (heroId: number) => {
    router.navigate([`/detail/${heroId}`]);
  };

  const onClick = (event: any) => {
    if (handleClick) {
      handleClick(event);
    }
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="react-component">
      <h2>Top React Heroes</h2>
      <div className={"heroes-menu"}>
        {heroes &&
          heroes.map((hero) => (
            <Button onClick={() => route(hero.id)}>{hero.name}</Button>
          ))}
        {/* heroes.map((hero) => <Button>{hero.name}</Button>)} */}

        {option1 && <Button onClick={onClick}>{option1}</Button>}
        {option2 && <Button onClick={onClick}>{option2}</Button>}
        {option3 && <Button onClick={onClick}>{option3}</Button>}
        {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date!)}
        /> */}
      </div>
    </div>
  );
};

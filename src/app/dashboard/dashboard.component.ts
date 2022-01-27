import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Dashboard } from 'src/components/dashboard/Dashboard';

@Component({
  selector: 'app-dashboard-old',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  public component: Function = Dashboard;
  public arguments: any = {
    option1: 'asd',
    option2: 'zxc',
    option3: 'qwe',
    heroService: this.heroService,
  };

  public handleOnClick(event: any) {
    this.arguments.option1 += this.arguments.option1;
  }

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}

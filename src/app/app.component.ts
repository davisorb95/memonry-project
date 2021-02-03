import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {HttpUtils} from '../utils/http-utils';

export interface Data {
  name: string;
  photo: string;
  show: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'memonry-project';
  private endpoint = 'http://18.191.152.48';

  displayedColumns: string[] = ['name', 'photo'];
  dataSource: MatTableDataSource<Data>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpUtils) {
    this.dataSource = new MatTableDataSource([]);
  }

  async ngOnInit(): Promise<void> {
    const result = (await this.getData()).data;
    const dataKeys = Object.keys(result);
    const data: Data[] = dataKeys.map(k => ({
      name: k,
      photo: result[k],
      show: false,
    }));

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getData(): Promise<any> {
    return this.http.get(`${this.endpoint}/api/enums/categoriasMarket`);
  }

  showImage(image: string | SVGImageElement): void {
    console.log('image: ', image);
  }
}


import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipaje } from 'src/app/models/equipaje';
import { EquipajeService } from 'src/app/services/equipaje.service';

@Component({
  selector: 'app-delaguila-listar',
  templateUrl: './delaguila-listar.component.html',
  styleUrls: ['./delaguila-listar.component.css']
})
export class DelaguilaListarComponent implements OnInit {
  dataSource: MatTableDataSource<Equipaje> = new MatTableDataSource();
  displayedColumns: string[] =
  ['codigo','fecha', 'estado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private eS: EquipajeService) {}
  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    }); 
  }
}

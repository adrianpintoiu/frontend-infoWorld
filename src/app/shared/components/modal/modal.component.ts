import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('title') title: string;
  @ViewChild('content') content: NgbModal;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalService.open(this.content)
  }
  
  close(): void {
    this.modalService.dismissAll();
  }

}

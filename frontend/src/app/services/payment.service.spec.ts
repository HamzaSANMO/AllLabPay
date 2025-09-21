import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService]
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should initiate payment', () => {
    const mockResponse = { reference: 'REF-123', redirectUrl: 'https://mtn.com/pay' };
    service.initiatePayment(1, 'MTN').subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/payments/init');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should poll payment status', () => {
    const paymentId = 1;
    const mockResponses = [
      { status: 'PENDING' },
      { status: 'PAID' }
    ];
    let responseCount = 0;

    service.pollPaymentStatus(paymentId).subscribe(res => {
      expect(res.status).toBe(mockResponses[responseCount++].status);
    });

    const req1 = httpMock.expectOne(`http://localhost:8080/api/payments/${paymentId}`);
    req1.flush(mockResponses[0]);
    const req2 = httpMock.expectOne(`http://localhost:8080/api/payments/${paymentId}`);
    req2.flush(mockResponses[1]);
  });
});

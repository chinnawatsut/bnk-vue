import BnkAPI from './bnk.api'
import httpClient from './httpClient'

jest.mock('./httpClient', () => ({
  get: jest.fn(),
  post: jest.fn(),
}))

describe('BnkAPI', () => {
  beforeEach(() => {
  })
  it('should call getAllMembers', () => {
    BnkAPI.getAllMembers()

    expect(httpClient.get).toHaveBeenCalledWith('/bnk/members')
  })
});